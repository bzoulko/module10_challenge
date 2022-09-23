/*
    Created:    09/22/2022 
    Programmer: Brian Zoulko
    Notes:      Devopled CLASS module for Manager's properties and methods.

    Modification
    ============
    09/22/2022 Brian Zoulko    Initial creation of class module.    
*/

class Manager {
    
    constructor(officeNumber) {
        this.officeNumber = officeNumber;
    }
    
    // Return:  Office Number
    getOfficeNumber() {
        console.log(`Office Number ${this.officeNumber}.`);
        return(this.officeNumber);
    }

    // Return:  Manager Class
    getRole() {
        console.log(`Manager ${Manager}.`);
        return(Manager);
    }

}
