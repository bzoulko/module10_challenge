/*
    Created:    09/24/2022 
    Programmer: Brian Zoulko
    Notes:      Devopled JAVASCRIPT module for entering team members via CLI.

    Modification
    ============
    09/24/2022 Brian Zoulko    Initial creation of js module.    
*/

// Required modules for this application.
const inquirer =    require('inquirer');
const fs =          require('fs');
const { clear, Console } =   require('console');
const htmlPage =    require("../lib/HtmlTemplate.js");
const jsdom =       require("jsdom"); // This library will allow JQuery.
  

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
      message: "Add aother member to my team: ",
      choices: ["engineer", "intern", "finished"],
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

const generateHTML = ({ answers }) => {
  let documentTitle = "Team Profile Generator";
  let webPageTitle = "My Team";
  return(htmlPage.getHTMLTemplate(documentTitle, webPageTitle));
}


function screenTitle() {
  clear();
  console.log("***********************************************");
  console.log("  T E A M   P R O F I L E   G E N E R A T O R  ");
  console.log("***********************************************");
}

// Start CLI Process.
function startCLI() {
  var manager = null;
  var employees = [];

  screenTitle();
  managerPrompt()
        
    .then((answers) => {
      let name = answers.manager;
      let ID = answers.ID;
      let email = answers.email;
      let office = answers.office;
      manager = new Manager(name, email, office);

    })
    .then(() => {

      //screenTitle();
      menuPrompt()
        // Use writeFileSync method to use promises instead of a callback function
        .then((answers) => {

          console.log("answers.menu: " + answers.menu);
          // let name = answers.manager;
          // let ID = answers.ID;
          // let email = answers.email;
          // let office = answers.office;
          // employees.push(new Employee(name, email, office));
    
        })
        .then(() => console.log('Successfully wrote to index.html'))
        .catch((err) => console.error(err));

    })
    .catch((err) => console.error(err))
};

startCLI();

// Add functions from other js files.
//module.exports = { getHTMLTemplate };

// // Include functions from additional javascript files.
// import {getHTMLTemplate} from '../lib/HtmlTemplate.js';

function buildIndexHTML (manager, employeeList) {

  // Creating a window with a document
  var dom = new jsdom.JSDOM(generateHTML(answers));

  // Importing the jquery and providing it
  // with the window
  var jquery = require("jquery")(dom.window);
  var manager = null;


  // Add Manager's card to the HTML.
  let formContent = jquery(".form-content");
  const mainSection = jquery("<section>");
  const cardSection = jquery("<section class='card'>");
  
  const divTop = jquery("<div>");
  const divTitleLine = jquery(`<p class="header-line1">`).text(name);
  const divOccupation = jquery(`<p class="header-line2">`).text("Manager");
  divTop.append(divTitleLine).append(divOccupation);

  const divBottom = jquery("<div class='card-bottom'>");
  const divID = jquery(`<div class='card-inside'>`).text("ID: " + ID);
  const aEmail = jquery(`<a class="email-link">`).text(email);
  const divEmail = jquery("<div class='card-inside'>").text("Email: ").append(aEmail);
  const divType = jquery(`<div class='card-inside'>`).text(office);
  divType.append(jquery(`<a>`));
  divBottom.append(divID).append(divEmail).append(divType);

  cardSection.append(divTop).append(divBottom);
  mainSection.append(cardSection);
  formContent.append(mainSection);

  let htmlData = jquery("html")
  fs.writeFileSync('index.html', "<!DOCTYPE html><html lang='en'>" + htmlData.html() + "</html>");
  
}