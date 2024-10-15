#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

// Get the project name from command line arguments
const projectName = process.argv[2];

if (!projectName) {
  console.error('Please provide a project name.');
  process.exit(1);
}

const projectDir = path.join(__dirname, '../src', projectName);
const projectsJsonPath = path.join(__dirname, '../projects.config.json');
const indexHtmlPath = path.join(__dirname, '../src/index.html');

// Function to delete the project folder
function deleteProjectFolder(projectName) {
  if (fs.existsSync(projectDir)) {
    fs.removeSync(projectDir);
    console.log(`Deleted project folder for ${projectName}`);
  } else {
    console.log(`Project folder ${projectName} does not exist.`);
  }
}

// Function to update projects.config.json
function updateProjectsConfig(projectName) {
  const projectsData = fs.readFileSync(projectsJsonPath, 'utf-8');
  const projectsConfig = JSON.parse(projectsData);

  if (projectsConfig.projects.includes(projectName)) {
    projectsConfig.projects = projectsConfig.projects.filter(proj => proj !== projectName);
    fs.writeFileSync(projectsJsonPath, JSON.stringify(projectsConfig, null, 2), 'utf-8');
    console.log(`Removed ${projectName} from projects.config.json`);
  } else {
    console.log(`${projectName} is not listed in projects.config.json.`);
  }
}

// Function to update src/index.html by removing the project link
function updateIndexHtml(projectName) {
  let indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  const ulRegex = /<ul>([\s\S]*?)<\/ul>/;
  const ulMatch = ulRegex.exec(indexHtml);

  if (ulMatch) {
    const projectsData = fs.readFileSync(projectsJsonPath, 'utf-8');
    const projectsConfig = JSON.parse(projectsData);

    const newLinks = projectsConfig.projects
      .map(proj => `<li><a href="/${proj}">${proj.charAt(0).toUpperCase() + proj.slice(1)}</a></li>`)
      .join('\n');
    const newUl = `<ul>\n${newLinks}\n</ul>`;
    indexHtml = indexHtml.replace(ulRegex, newUl);
    fs.writeFileSync(indexHtmlPath, indexHtml, 'utf-8');
    console.log(`Updated src/index.html to remove the link for ${projectName}.`);
  } else {
    console.error('Could not find <ul> in src/index.html.');
  }
}

// Main function to delete the project
function deleteProject(projectName) {
  deleteProjectFolder(projectName);
  updateProjectsConfig(projectName);
  updateIndexHtml(projectName);
  console.log(`Project ${projectName} deleted successfully.`);
}

// Execute the delete function
deleteProject(projectName);
