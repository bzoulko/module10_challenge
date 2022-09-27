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
      return(this);
    }
      
  }

  module.exports = Employee;