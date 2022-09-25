/*
    Created:    09/22/2022 
    Programmer: Brian Zoulko
    Notes:      Devopled CLASS module for Manager's properties and methods.

    Modification
    ============
    09/22/2022 Brian Zoulko    Initial creation of class module.    
*/

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

    // Return:  Office Number
    getOfficeNumber() {
        return(this.officeNumber);
    }

    // Return:  Email
    getOfficeNumber() {
        return(this.email);
    }

    // Return:  Name
    getName() {
        return(this.name);
    }
    
    // Return:  Manager Class
    getRole() {
        return(Manager);
    }

}
