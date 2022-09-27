const Employee = require("./Employee");

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
      return(this);
    }
  
  }
  
  module.exports = Manager;  