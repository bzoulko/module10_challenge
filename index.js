/*
    Created:    09/24/2022 
    Programmer: Brian Zoulko
    Notes:      Devopled JAVASCRIPT module for entering team members via CLI.

    Modification
    ============
    09/24/2022 Brian Zoulko    Initial creation of js module.    
*/

// Required modules for this application.
const inquirer            = require('inquirer');  // Prompt features for CLI.
const fs                  = require('fs');        // File System I/O.
const path                = require('path');      // Current file path.
const puppeteer           = require('puppeteer'); // Used to systematically run the new html file.
const { clear, Console }  = require('console');   // Clear console area on demand.
const jsdom               = require("jsdom");     // This library will allow JQuery.


// Required Class Modules and HTML-Template.
const htmlPage            = require("./src/HtmlTemplate");
const Manager             = require("./lib/Manager");
const Engineer            = require("./lib/Engineer");
const Intern              = require("./lib/Intern");


// Barrowed logic idea from Bootcamp - Week(5) - Day(3) - 08-Stu_for-of/Unsolved/index.js
const printBlueBkgrndText = (text) => `\x1b[44m${text}\x1b[0m`;
const printUnderLineText  = (text) => `\x1b[4m\x1b[33m${text}\x1b[0m`;
const printRedText        = (text) => `\x1b[31m${text}\x1b[0m`; 
const printYellowText     = (text) => `\x1b[33m${text}\x1b[0m`; 
const FLD_LEN = 38;


// Setup Manager Prompt.
const managerPrompt = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: `Team Manager's ${printUnderLineText("name")}: `.padStart(FLD_LEN),
    },
    {
      type: 'input',
      name: 'ID',
      message: `Manager's ${printUnderLineText("ID")}: `.padStart(FLD_LEN),
      validate: function (id) {
        valid = !(/\D/.test(id));
        if (valid) return true;
        console.log(".  " + printRedText("ID must be numeric."));
        return false;
      }
    },
    {
      type: 'input',
      name: 'email',
      message: `Manger's ${printUnderLineText("email")}: `.padStart(FLD_LEN),
      validate: function (email) {
          // Found sample email validation on: https://gist.github.com/Amitabh-K/...
          valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
          if (valid) return true;
          console.log(".  " + printRedText("Please enter a valid email"));
          return false;
      }
    },
    {
      type: 'input',
      name: 'office',
      message: `Manager's ${printUnderLineText("office number")}: `.padStart(FLD_LEN),
      validate: function (officeNumber) {
        valid = !(/\D/.test(officeNumber));
        if (valid) return true;
        console.log(".  " + printRedText("Office Number must be numeric."));
        return false;
      }
    },
  ]);
};

// Setup Menu Prompt
const menuPrompt = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "menu",
      message: `${printYellowText("ADD")} a team member or select ${printUnderLineText("Finished")} to exit: `,
      choices: [new inquirer.Separator(), "Engineer", "Intern", new inquirer.Separator(), "Finished", new inquirer.Separator()],
    }
  ]);
};

// Setup Engineer Prompt
const engineerPrompt = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: `Engineer's ${printUnderLineText("name")}: `.padStart(FLD_LEN),
    },
    {
      type: 'input',
      name: 'ID',
      message: `Engineer's ${printUnderLineText("ID")}: `.padStart(FLD_LEN),
      validate: function (id) {
        valid = !(/\D/.test(id));
        if (valid) return true;
        console.log(".  " + printRedText("ID must be numeric."));
        return false;
      }
    },
    {
      type: 'input',
      name: 'email',
      message: `Engineer's ${printUnderLineText("email")}: `.padStart(FLD_LEN),
      validate: function (email) {
        // Found sample email validation on: https://gist.github.com/Amitabh-K/...
        valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        if (valid) return true;
        console.log(".  " + printRedText("Please enter a valid email"));
        return false;
      }
    },
    {
      type: 'input',
      name: 'github',
      message: `Engineer's ${printUnderLineText("github")}: `.padStart(FLD_LEN),
    },
  ]);
};

// Setup Intern Prompt
const internPrompt = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: `Intern's ${printUnderLineText("name")}: `.padStart(FLD_LEN),
    },
    {
      type: 'input',
      name: 'ID',
      message: `Intern's ${printUnderLineText("ID")}: `.padStart(FLD_LEN),
      validate: function (id) {
        valid = !(/\D/.test(id));
        if (valid) return true;
        console.log(".  " + printRedText("ID must be numeric."));
        return false;
      }
    },
    {
      type: 'input',
      name: 'email',
      message: `Intern's ${printUnderLineText("email")}: `.padStart(FLD_LEN),
      validate: function (email) {
        // Found sample email validation on: https://gist.github.com/Amitabh-K/...
        valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        if (valid) return true;
        console.log(".  " + printRedText("Please enter a valid email"));
        return false;
      }
    },
    {
      type: 'input',
      name: 'school',
      message: `Enter ${printUnderLineText("school")}: `.padStart(FLD_LEN),
    },
  ]);
};


function screenTitle(msg) {
  clear();
  console.log("***********************************************");
  console.log(printBlueBkgrndText(msg));
  console.log("***********************************************");
}

// Start CLI Process.
function startCLI() {

  // Creating a window with a document
  let documentTitle = "Team Profile Generator";
  let webPageTitle = "My Team";
  var dom = new jsdom.JSDOM(htmlPage.getHTMLTemplate(documentTitle, webPageTitle));

  // Add Team Manger
  addTeamManager(dom);
  
};


/* **************************************
  Write HTML Index file from jQuery data.
***************************************** */
function writeHTMLfile(htmlData) {
  fs.writeFileSync('./dist/index.html', "<!DOCTYPE html><html lang='en'>" + htmlData.html() + "</html>");
}


/* ********************************************************
  Add Manager to html and start prompting for team members.
*********************************************************** */
function addTeamManager(dom) {
  
  // Importing the jquery and providing it
  // with the window
  var jquery = require("jquery")(dom.window);

  screenTitle("  T E A M   P R O F I L E   G E N E R A T O R  ");
  managerPrompt()
        
    .then((answers) => {

      // Define and store manager detail.
      const manager = new Manager(answers.name, answers.ID, answers.email, answers.office);      
      addEmployeeCard(jquery, manager, "M");
  
    })
    .then(() => {

      addTeamMembers(jquery);

    })
    .catch((err) => console.error(err))
}


/* ************************************************************************
  Add Team Members that will be call recursivly until the user is finished.
*************************************************************************** */
function addTeamMembers(jquery) {

  screenTitle("        A D D   T E A M   M E M B E R S        ");
  menuPrompt() 
    .then((answers) => {

      // When finished, write out HTML file and open it.
      if (answers.menu === "Finished") {
        console.log("Finished - index.html has been created and launched in browser.");
        writeHTMLfile(jquery("html"));

        // Waits until browser window closes.
        launchHtml(__dirname + "\\dist\\index.html");
      }

      switch (answers.menu) {
        case "Engineer":
          screenTitle("   E N T E R   E N G I N E E R   D E T A I L  ");                          
          engineerPrompt() 
            .then((answers) => {
              
              // Add ENGINEER card to html.
              const engineer = new Engineer(answers.name, answers.ID, answers.email, answers.github);
              addEmployeeCard(jquery, engineer, "E");

              // Ask for more team members.
              addTeamMembers(jquery);
      
            })
            .catch((err) => {
              console.error(err);
              return;
            });        
          break;
      
        case "Intern":
          screenTitle("     E N T E R   I N T E R N   D E T A I L    ");                          
          internPrompt() 
            .then((answers) => {
      
              // Add INTERN card to html.
              const intern = new Intern(answers.name, answers.ID, answers.email, answers.school);
              addEmployeeCard(jquery, intern, "I");

              // Ask for more team members.
              addTeamMembers(jquery);

            })
            .catch((err) => {
              console.error(err);
              return;
            });          
          break;            
      }

    })
    .catch((err) => {
      console.error(err);
      return;
    });        
}


/* *************************
  Launch HTML page in Browser.
**************************** */
async function launchHtml(htmlString) {
  
  // Define and launch browser with html page.
  const browser = await puppeteer.launch({
    headless: false, 
    defaultViewport: null, 
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });
  const pages = await browser.pages();
  const page = pages[0];
  await page.goto(htmlString);
  return;

}


/* ******************************
  Add Employee Card to Index.html
********************************* */
function addEmployeeCard(jquery, clsMod, type) {

  // Locate Form where to add card.
  let formContent = jquery(".form-content");

  // Create section for the card and start building card section
  const mainSection = jquery("<section>");
  const cardSection = jquery("<section class='card'>");

  // Top half of the Card.
  const divTop = jquery("<div>");
  const divTitleLine = jquery(`<p class="header-line1">`).text(convertToTitle(clsMod.getName()));
  const divOccupation = jquery(`<p class="header-line2">`).text(clsMod.getTitle());
  divTop.append(divTitleLine).append(divOccupation);

  // Bottom half of the Card.
  const divBottom = jquery("<div class='card-bottom'>");
  const divID = jquery(`<div class='card-inside'>`).text("ID: " + clsMod.getID());
  const aEmail = jquery(`<a class="email-link">`).text(clsMod.getEmail());
  const divEmail = jquery("<div class='card-inside'>").text("Email: ").append(aEmail);
  const divType = jquery(`<div class='card-inside'>`);
  switch (type) {
    case "M":
      divType.text("Office number: ");
      divType.append(jquery(`<a>`).text(clsMod.getOfficeNumber()));
      break;

    case "E":
      divType.text("GitHub: ");
      divType.append(jquery(`<a>`).text(clsMod.getGitHub()));
      break;

    case "I":
      divType.text("School: ");
      divType.append(jquery(`<a>`).text(clsMod.getSchool()));
      break;
  }
  divBottom.append(divID).append(divEmail).append(divType);

  // Add both halves into the card section.
  cardSection.append(divTop).append(divBottom);
  mainSection.append(cardSection);

  // Update form with card section
  formContent.append(mainSection);

}



/* *************************************
    Convert string to Title Case Format.
**************************************** */
function convertToTitle(stringIn){
  var stringOut = stringIn.toLowerCase().split(' ');
  for (var i = 0; i < stringOut.length; i++) {
      stringOut[i] = stringOut[i].charAt(0).toUpperCase() + stringOut[i].slice(1);
  }
  return stringOut.join(' ');
}


// Begin CLI prompting.
startCLI();
