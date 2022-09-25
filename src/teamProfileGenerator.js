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
const { clear } =   require('console');
const htmlPage =    require("../lib/HtmlTemplate.js");

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
      message: "Add Option: ",
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
  screenTitle();
  managerPrompt()
    // Use writeFileSync method to use promises instead of a callback function
    .then((answers) => {
      // Create HTML Web Page.
      fs.writeFileSync('index.html', generateHTML(answers));
      // console.log("name: " + answers.manager);
      // console.log("id: " + answers.ID);
      // console.log("email: " + answers.email);
      // console.log("office: " + answers.office);
      

  //  <section>
  //     <section class="card">
  //         <div>
  //             <p class="header-line1">${name}</p>
  //             <p class="header-line2">${occupation}</p>
  //         </div>
  //         <div class="card-bottom">
  //             <div class="card-inside">ID: ${id}</div>
  //             <div class="card-inside">Email:
  //                 <a class="email-link">${email}</a>
  //             </div>
  //             <div class="card-inside">${type}:
  //                 <a>${typeDetail}</a>
  //             </div>
  //         </div>
  //     </section>
  //  </section>

      // Add Manager's card to the HTML.
      var formContent = $(".form-content");
      const mainSection = $("<section>");
      const cardSection = $("<section class='card'>");
      
      const divTop = $("<div>");
      const divTitleLine = $(`<p class="header-line1">${"name"}`);
      const divOccupation = $(`<p class="header-line2">${"occupation"}`);
      divTop.append(divTitleLine).append(divOccupation);

      const divBottom = $("<div class='card-bottom'>");
      const divID = $("<div class='card-inside'>ID: ${id}>");
      const divEmail = $("<div class='card-inside'>Email:>").append($(`<a class="email-link">${'email'}>`));
      const divType = $(`<div class='card-inside'>${'type'}:`).append($(`<a>${'typeDetail'}`));
      divBottom.append(divID).append(divEmail).append(divType);

      cardSection.append(divTop).append(divBottom);
      mainSection.append(cardSection);
      formContent.append(mainSection);

    })
    .then(() => {

      //screenTitle();
      menuPrompt()
        // Use writeFileSync method to use promises instead of a callback function
        .then((answers) => fs.writeFileSync('index.html', generateHTML(answers)))
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
