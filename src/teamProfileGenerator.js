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
const jsdom =       require("jsdom"); // This library will allow JQuery.
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


function screenTitle() {
  clear();
  console.log("***********************************************");
  console.log("  T E A M   P R O F I L E   G E N E R A T O R  ");
  console.log("***********************************************");
}

// Start CLI Process.
function startCLI() {
  var employeeList = [];
  var manager = null;
  var intern = null;
  var engineer = null;

  screenTitle();
  managerPrompt()
        
    .then((answers) => {

      // Define and store manager detail.
      manager = new Manager(answers.ID, answers.manager, answers.email, answers.office);      

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
          buildIndexHTML(manager, employeeList);
    
        })
        .then(() => console.log('Successfully wrote to index.html'))
        .catch((err) => console.error(err));

    })
    .catch((err) => console.error(err))
};

startCLI();
function buildIndexHTML (manager, employeeList) {

  // Creating a window with a document
  let documentTitle = "Team Profile Generator";
  let webPageTitle = "My Team";
  var dom = new jsdom.JSDOM(htmlPage.getHTMLTemplate(documentTitle, webPageTitle));

  // Importing the jquery and providing it
  // with the window
  var jquery = require("jquery")(dom.window);
  
  buildManagerCard(jquery, manager);

  let htmlData = jquery("html")

  fs.writeFileSync('index.html', "<!DOCTYPE html><html lang='en'>" + htmlData.html() + "</html>");
  
}

/* ********************************
  Build Manager Card for Index.html
*********************************** */
function buildManagerCard(jquery, manager) {
    // Add Manager's card to the HTML.
    let formContent = jquery(".form-content");
    const mainSection = jquery("<section>");
    const cardSection = jquery("<section class='card'>");
    
    const divTop = jquery("<div>");
    const divTitleLine = jquery(`<p class="header-line1">`).text(manager.getName());
    const divOccupation = jquery(`<p class="header-line2">`).text(manager.getTitle());
    divTop.append(divTitleLine).append(divOccupation);
  
    const divBottom = jquery("<div class='card-bottom'>");
    const divID = jquery(`<div class='card-inside'>`).text("ID: " + manager.getID());
    const aEmail = jquery(`<a class="email-link">`).text(manager.getEmail());
    const divEmail = jquery("<div class='card-inside'>").text("Email: ").append(aEmail);
    const divType = jquery(`<div class='card-inside'>`).text("Office number: ");
    divType.append(jquery(`<a>`).text(manager.getOfficeNumber()));
    divBottom.append(divID).append(divEmail).append(divType);
  
    cardSection.append(divTop).append(divBottom);
    mainSection.append(cardSection);
    formContent.append(mainSection);  
}


/*
    Created:    09/22/2022 
    Programmer: Brian Zoulko
    Notes:      Devopled CLASS module for Employee's properties and methods.

    Modification
    ============
    09/22/2022 Brian Zoulko    Initial creation of class module.    
*/
/* **************************************
  C L A S S   M O D U L E  -  Employee(s) 
***************************************** */
class Employee {
    
  constructor(name, id, email) {
      this.name = name;
      this.id = id;
      this.email = email;
  }

  // Return:  Employee Name.
  getName() {
      console.log(`Employee Name is ${this.name}.`);
      return(this.name);
  }

  // Return:  Employee Id
  getId() {
      console.log(`Employee Id is ${this.id}.`);
      return(this.id);
  }

  // Return:  Employee Email
  getEmail() {
      console.log(`Employee Email is ${this.email}.`);
      return(this.email);
  }

  // Return:  Employee Class
  getRole() {
      console.log(`Employee ${Employee}.`);
      return(Employee);
  }

}


/*
    Created:    09/22/2022 
    Programmer: Brian Zoulko
    Notes:      Devopled CLASS module for Manager's properties and methods.

    Modification
    ============
    09/22/2022 Brian Zoulko    Initial creation of class module.    
*/
/* **********************************
  C L A S S   M O D U L E  -  Manager 
************************************* */
class Manager {        

  constructor(id, name, email, officeNumber) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.officeNumber = officeNumber;
  }

  // Return:  Title Text w/Emoji Image
  getTitle(){
      return("🍵Manager");
  }
  
  // Return:  ID
  getID() {
      return(this.id);
  }
  setID(id) {
      this.id = id;
  }
  

  // Return:  Office Number
  getOfficeNumber() {
      return(this.officeNumber);
  }
  setOfficeNumber(officeNumber) {
      this.officeNumber = officeNumber;
  }


  // Return:  Email
  getEmail() {
      return(this.email);
  }
  setEmail(email) {
      this.email = email;
  }


  // Return:  Name
  getName() {
      return(this.name);
  }
  setName(name) {
      this.name = name;
  }

  
  // Return:  Manager Class
  getRole() {
      return(Manager);
  }

}


/*
    Created:    09/22/2022 
    Programmer: Brian Zoulko
    Notes:      Devopled CLASS module for Engineer's properties and methods.

    Modification
    ============
    09/22/2022 Brian Zoulko    Initial creation of class module.    
*/
/* ***********************************
  C L A S S   M O D U L E  -  Engineer 
************************************** */
class Engineer {
    
  constructor(gitHub) {
      this.gitHub = gitHub;
  }
  
  // Return:  Git Hub URL
  getGitHub() {
      console.log(`Engineer gitHub ${this.gitHub}.`);
      return(this.gitHub);
  }

  // Return:  Title Text w/Emoji Image
  getTitle(){
      return("👷Engineer");
  }

  // Retrun:  Engineer Class
  getRole() {
      console.log(`Engineer ${Engineer}.`);
      return(Engineer);
  }

}


/*
    Created:    09/22/2022 
    Programmer: Brian Zoulko
    Notes:      Devopled CLASS module for Intern's properties and methods.

    Modification
    ============
    09/22/2022 Brian Zoulko    Initial creation of class module.    
*/
/* *********************************
  C L A S S   M O D U L E  -  Intern 
************************************ */
class Intern {
    
  constructor(school) {
      this.school = school;
  }
  
  // Return:  School
  getSchool() {
      console.log(`Intern school ${this.school}.`);
      return(this.school);
  }

  // Return:  Title Text w/Emoji Image
  getTitle(){
      return("🎓Intern");
  }
  
  // Return:  Intern Class
  getRole() {
      console.log(`Intern ${Intern}.`);
      return(Intern);
  }

}
