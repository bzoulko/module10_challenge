/*
    Created:    09/22/2022 
    Programmer: Brian Zoulko
    Notes:      Devopled CLASS module for Intern's properties and methods.

    Modification
    ============
    09/22/2022 Brian Zoulko    Initial creation of class module.    
*/

class Intern {
    
    constructor(school) {
        this.school = school;
    }
    
    // Return:  School
    getSchool() {
        console.log(`Intern school ${this.school}.`);
        return(this.school);
    }

    // Return:  Intern Class
    getRole() {
        console.log(`Intern ${Intern}.`);
        return(Intern);
    }

}
