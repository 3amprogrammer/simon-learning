#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');

const projectName = process.argv[2];

if (!projectName) {
  console.error('Please provide a project name.');
  process.exit(1);
}

const projectDir = path.join(__dirname, '../src', projectName);
const templateDir = path.join(__dirname, 'template');

if (fs.existsSync(projectDir)) {
  console.error(`Project ${projectName} already exists.`);
  process.exit(1);
}

function createProject(projectName) {
  copyTemplateFiles(projectName);
  updateProjectTitle(projectName);
  updateProjectsConfig(projectName);
  updateIndexHtml(projectName);
  console.log(`Project ${projectName} created successfully.`);
}

function copyTemplateFiles(projectName) {
  fs.copySync(templateDir, projectDir);
  console.log(`Template files copied to ${projectDir}`);
}

function updateProjectTitle(projectName) {
  const projectIndexHtmlPath = path.join(projectDir, 'index.html');
  const projectIndexHtml = fs.readFileSync(projectIndexHtmlPath, 'utf-8');

  const updatedHtml = projectIndexHtml.replace(
    /<title>(.*?)<\/title>/,
    `<title>${capitalize(projectName)} Project</title>`
  );

  fs.writeFileSync(projectIndexHtmlPath, updatedHtml, 'utf-8');
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateProjectsConfig(projectName) {
  const projectsJsonPath = path.join(__dirname, '../projects.config.json');
  const projectsData = fs.readFileSync(projectsJsonPath, 'utf-8');
  const projectsConfig = JSON.parse(projectsData);

  if (!projectsConfig.projects.includes(projectName)) {
    projectsConfig.projects.push(projectName);
    fs.writeFileSync(projectsJsonPath, JSON.stringify(projectsConfig, null, 2), 'utf-8');
    console.log(`Project ${projectName} added to projects.config.json`);
  } else {
    console.log(`Project ${projectName} already exists in projects.config.json`);
  }
}

function updateIndexHtml(projectName) {
  const indexHtmlPath = path.join(__dirname, '../src/index.html');
  let indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  const projectsJsonPath = path.join(__dirname, '../projects.config.json');
  const projectsData = fs.readFileSync(projectsJsonPath, 'utf-8');
  const projectsConfig = JSON.parse(projectsData);

  const ulRegex = /<ul>([\s\S]*?)<\/ul>/;
  const ulMatch = ulRegex.exec(indexHtml);

  if (ulMatch) {
    const newLinks = projectsConfig.projects
      .map(proj => `<li><a href="/${proj}">${capitalize(proj)}</a></li>`)
      .join('\n');
    const newUl = `<ul>\n${newLinks}\n</ul>`;
    indexHtml = indexHtml.replace(ulRegex, newUl);
    fs.writeFileSync(indexHtmlPath, indexHtml, 'utf-8');
    console.log(`Updated src/index.html with new project link for ${projectName}.`);
  } else {
    console.error('Could not find <ul> in src/index.html.');
  }
}

createProject(projectName);
