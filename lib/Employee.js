/*
    Created:    09/22/2022 
    Programmer: Brian Zoulko
    Notes:      Devopled CLASS module for Employee's properties and methods.

    Modification
    ============
    09/22/2022 Brian Zoulko    Initial creation of class module.    
*/

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
