const Employee = require('./Employee');

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
      return(this);
    }
  
  }
  
  module.exports = Intern;  