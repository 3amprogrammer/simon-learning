# simon-learning

This repository contains a simple development environment where you can easily create new projects, work with HTML, CSS, and JavaScript, and take advantage of hot reload to see changes in real-time.

## Table of Contents
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Creating a New Project](#creating-a-new-project)

## Getting Started

Before you start, make sure you have [Node.js](https://nodejs.org/) installed on your system. You’ll need it to run the development server and use the `npm` commands.

### 1. Clone the Repository

First, clone this repository to your local machine:

```bash
git clone git@github.com:3amprogrammer/simon-learning.git
cd simon-learning
```

### 2. Install Dependencies
 Once inside the project folder, install the necessary dependencies by running:

```bash
npm install
```

This will download and install all the packages needed for the project to run.

### 3. Start the Development Server

To start the development server with hot reloading, use the following command:

```bash
npm run start
```

This will automatically open your browser and load the project. Any changes made to HTML, CSS, or JavaScript files will be automatically reloaded in the browser.

## Project Structure
The main folder you’ll be working in is the src/ folder. Each project you create will live inside the src/ folder. The general structure is as follows:

```
/src
  ├── index.html        # Main page with links to all projects
  ├── /project-name     # Folder for each individual project
  │   ├── index.html    # HTML file for the project
  │   ├── style.css     # CSS file for the project
  │   └── app.js        # JavaScript file for the project
```

Each project should have its own folder inside the src/ directory, containing an index.html, style.css, and app.js.

## Creating a New Project
To create a new project, use the following command:

```bash
npm run create-project <project_name>
```

This will create a new folder inside src/ with the following structure:

```
/src/<project_name>
  ├── index.html    # Your HTML file
  ├── style.css     # Your CSS file
  └── app.js        # Your JavaScript file
```

It will also automatically add a link to the new project in the main src/index.html file, so you can easily access it from the browser.
