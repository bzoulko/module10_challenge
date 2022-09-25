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

