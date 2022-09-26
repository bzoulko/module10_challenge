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
      message: `Team Manager's name: `,
    },
    {
      type: 'input',
      name: 'ID',
      message: `Manager's ID: `,
    },
    {
      type: 'input',
      name: 'email',
      message: `Manger's email: `,
    },
    {
      type: 'input',
      name: 'office',
      message: `Manager's office number: `,
    },
  ]);
};


// Setup Menu Prompt
const menuPrompt = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "menu",
      message: "Add a team member or 'finshed' to exit: ",
      choices: ["engineer", "intern", new inquirer.Separator(), "finished"],
    }
  ]);
};


// Setup Engineer Prompt
const engineerPrompt = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: `Engineer's name: `,
    },
    {
      type: 'input',
      name: 'ID',
      message: `Engineer's ID: `,
    },
    {
      type: 'input',
      name: 'email',
      message: `Engineer's email: `,
    },
    {
      type: 'input',
      name: 'github',
      message: `Engineer's GitHub: `,
    },
  ]);
};

// Setup Intern Prompt
const internPrompt = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: `Intern's name: `,
    },
    {
      type: 'input',
      name: 'ID',
      message: `Intern's ID: `,
    },
    {
      type: 'input',
      name: 'email',
      message: `Intern's email: `,
    },
    {
      type: 'input',
      name: 'school',
      message: 'Enter school: ',
    },
  ]);
};


function screenTitle(msg) {
  clear();
  console.log("***********************************************");
  console.log(msg);
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
  fs.writeFileSync('index.html', "<!DOCTYPE html><html lang='en'>" + htmlData.html() + "</html>");
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
      addManagerCard(jquery, manager);
  
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
      if (answers.menu === "finished") {
        console.log("Finished!");
        writeHTMLfile(jquery("html"));
        jquery.open('index.html', '_self');
        return;
      }

      switch (answers.menu) {
        case "engineer":
          screenTitle("   E N T E R   E N G I N E E R   D E T A I L  ");                          
          engineerPrompt() 
            .then((answers) => {
              
              // Add ENGINEER card to html.
              const engineer = new Engineer(answers.name, answers.ID, answers.email, answers.github);
              addEngineerCard(jquery, engineer);

              // Ask for more team members.
              addTeamMembers(jquery);
      
            })
            .catch((err) => {
              console.error(err);
              return;
            });        
          break;
      
        case "intern":
          screenTitle("     E N T E R   I N T E R N   D E T A I L    ");                          
          internPrompt() 
            .then((answers) => {
      
              // Add INTERN card to html.
              const intern = new Intern(answers.name, answers.ID, answers.email, answers.school);
              addInternCard(jquery, intern);

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


/* ********************************
  Add Manager Card for Index.html
*********************************** */
function addManagerCard(jquery, manager) {

    // Locate Form where to add card.
    let formContent = jquery(".form-content");

    // Create section for the card and start building card section
    const mainSection = jquery("<section>");
    const cardSection = jquery("<section class='card'>");
    
    // Top half of the Card.
    const divTop = jquery("<div>");
    const divTitleLine = jquery(`<p class="header-line1">`).text(manager.getName());
    const divOccupation = jquery(`<p class="header-line2">`).text(manager.getTitle());
    divTop.append(divTitleLine).append(divOccupation);
  
    // Bottom half of the Card.
    const divBottom = jquery("<div class='card-bottom'>");
    const divID = jquery(`<div class='card-inside'>`).text("ID: " + manager.getID());
    const aEmail = jquery(`<a class="email-link">`).text(manager.getEmail());
    const divEmail = jquery("<div class='card-inside'>").text("Email: ").append(aEmail);
    const divType = jquery(`<div class='card-inside'>`).text("Office number: ");
    divType.append(jquery(`<a>`).text(manager.getOfficeNumber()));
    divBottom.append(divID).append(divEmail).append(divType);
  
    // Add both halves into the card section.
    cardSection.append(divTop).append(divBottom);
    mainSection.append(cardSection);

    // Update form with card section
    formContent.append(mainSection);

}


/* *******************************
  Add Engineer Card to Index.html
********************************** */
function addEngineerCard(jquery, engineer) {

  // Locate Form where to add card.
  let formContent = jquery(".form-content");

  // Create section for the card and start building card section
  const mainSection = jquery("<section>");
  const cardSection = jquery("<section class='card'>");

  // Top half of the Card.
  const divTop = jquery("<div>");
  const divTitleLine = jquery(`<p class="header-line1">`).text(engineer.getName());
  const divOccupation = jquery(`<p class="header-line2">`).text(engineer.getTitle());
  divTop.append(divTitleLine).append(divOccupation);

  // Bottom half of the Card.
  const divBottom = jquery("<div class='card-bottom'>");
  const divID = jquery(`<div class='card-inside'>`).text("ID: " + engineer.getID());
  const aEmail = jquery(`<a class="email-link">`).text(engineer.getEmail());
  const divEmail = jquery("<div class='card-inside'>").text("Email: ").append(aEmail);
  const divType = jquery(`<div class='card-inside'>`).text("GitHub: ");
  divType.append(jquery(`<a>`).text(engineer.getGitHub()));
  divBottom.append(divID).append(divEmail).append(divType);

  // Add both halves into the card section.
  cardSection.append(divTop).append(divBottom);
  mainSection.append(cardSection);

  // Update form with card section
  formContent.append(mainSection);

}


/* ****************************
  Add Intern Card to Index.html
******************************* */
function addInternCard(jquery, intern) {

  // Locate Form where to add card.
  let formContent = jquery(".form-content");

  // Create section for the card and start building card section
  const mainSection = jquery("<section>");
  const cardSection = jquery("<section class='card'>");

  // Top half of the Card.
  const divTop = jquery("<div>");
  const divTitleLine = jquery(`<p class="header-line1">`).text(intern.getName());
  const divOccupation = jquery(`<p class="header-line2">`).text(intern.getTitle());
  divTop.append(divTitleLine).append(divOccupation);

  // Bottom half of the Card.
  const divBottom = jquery("<div class='card-bottom'>");
  const divID = jquery(`<div class='card-inside'>`).text("ID: " + intern.getID());
  const aEmail = jquery(`<a class="email-link">`).text(intern.getEmail());
  const divEmail = jquery("<div class='card-inside'>").text("Email: ").append(aEmail);
  const divType = jquery(`<div class='card-inside'>`).text("School: ");
  divType.append(jquery(`<a>`).text(intern.getSchool()));
  divBottom.append(divID).append(divEmail).append(divType);

  // Add both halves into the card section.
  cardSection.append(divTop).append(divBottom);
  mainSection.append(cardSection);

  // Update form with card section
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
    return(this.name);
  }

  // Return:  Employee Id
  getID() {
    return(this.id);
  }

  // Return:  Employee Email
  getEmail() {
    return(this.email);
  }

  // Return:  Employee Class
  getRole() {
    return(new Employee(this.name, this.id, this.email));
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
class Manager extends Employee {        

  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }

  getName() {
    return(super.getName());
  }

  getID() {
    return(super.getID());
  }

  getEmail() {
    return(super.getEmail());
  }

  // Return:  Title Text w/Emoji Image
  getTitle(){
    return("🍵Manager");
  }
  
  // Return:  Office Number
  getOfficeNumber() {
    return(this.officeNumber);
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
class Engineer extends Employee {
    
  constructor(name, id, email, gitHub) {
    super(name, id, email);
    this.gitHub = gitHub;
  }

  getName() {
    return(super.getName());
  }

  getID() {
    return(super.getID());
  }

  getEmail() {
    return(super.getEmail());
  }
  
  // Return:  Git Hub URL
  getGitHub() {
    return(this.gitHub);
  }

  // Return:  Title Text w/Emoji Image
  getTitle(){
    return("👷Engineer");
  }

  // Retrun:  Engineer Class
  getRole() {
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
class Intern extends Employee{
    
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }

  getName() {
    return(super.getName());
  }

  getID() {
    return(super.getID());
  }

  getEmail() {
    return(super.getEmail());
  }

  // Return:  School
  getSchool() {
    return(this.school);
  }

  // Return:  Title Text w/Emoji Image
  getTitle(){
    return("🎓Intern");
  }
  
  // Return:  Intern Class
  getRole() {
    return(Intern);
  }

}


// Begin CLI prompting.
startCLI();
