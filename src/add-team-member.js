/*
    Created:    09/24/2022 
    Programmer: Brian Zoulko
    Notes:      Devopled JAVASCRIPT module for entering team members via CLI.

    Modification
    ============
    09/24/2022 Brian Zoulko    Initial creation of js module.    
*/

// Required modules for this application.
const inquirer = require('inquirer');
const fs = require('fs');
const { clear } = require('console');

// Setup Manager Prompt.
const managerPrompt = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'manager',
      message: `Team manager's name: `,
    },
    {
      type: 'input',
      name: 'ID',
      message: 'Enter employee ID: ',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter email address: ',
    },
    {
      type: 'input',
      name: 'office',
      message: 'Enter office number: ',
    },
  ]);
};


// Setup Menu Prompt
const menuPrompt = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "menu",
      message: "Select Menu Option",
      choices: ["cake", "fries"]
    }
  ]);
};


// Setup Engineer Prompt
const engineerPrompt = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'manager',
      message: `Team manager's name: `,
    },
    {
      type: 'input',
      name: 'ID',
      message: 'Enter employee ID: ',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter email address: ',
    },
    {
      type: 'input',
      name: 'office',
      message: 'Enter office number: ',
    },
  ]);
};

// Setup Intern Prompt
const internPrompt = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'manager',
      message: `Team manager's name: `,
    },
    {
      type: 'input',
      name: 'ID',
      message: 'Enter employee ID: ',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter email address: ',
    },
    {
      type: 'input',
      name: 'office',
      message: 'Enter office number: ',
    },
  ]);
};

const generateHTML = ({ name, location, github, linkedin }) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${name}</h1>
    <p class="lead">I am from ${location}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${github}</li>
      <li class="list-group-item">LinkedIn: ${linkedin}</li>
    </ul>
  </div>
</div>
</body>
</html>`;


function screenTitle() {
  clear();
  console.log("***********************************************");
  console.log("  T E A M   P R O F I L E   G E N E R A T O R  ");
  console.log("***********************************************");
}


// Start CLI Process.
function startCLI() {
  screenTitle();
  managerPrompt()
    
    // Use writeFileSync method to use promises instead of a callback function
    .then((answers) => fs.writeFileSync('index.html', generateHTML(answers)))
    .then(() => {

      screenTitle();
      menuPrompt()
        // Use writeFileSync method to use promises instead of a callback function
        .then((answers) => fs.writeFileSync('index.html', generateHTML(answers)))
        .then(() => console.log('Successfully wrote to index.html'))
        .catch((err) => console.error(err));

    })
    .catch((err) => console.error(err))
};

startCLI();