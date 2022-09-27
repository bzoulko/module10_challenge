const Employee = require("./Employee");

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
      return(this);
    }
  
  }
  
  module.exports = Engineer;  