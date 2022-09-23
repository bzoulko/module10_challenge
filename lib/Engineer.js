/*
    Created:    09/22/2022 
    Programmer: Brian Zoulko
    Notes:      Devopled CLASS module for Engineer's properties and methods.

    Modification
    ============
    09/22/2022 Brian Zoulko    Initial creation of class module.    
*/

class Engineer {
    
    constructor(gitHub) {
        this.gitHub = gitHub;
    }
    
    // Return:  Git Hub URL
    getGitHub() {
        console.log(`Engineer gitHub ${this.gitHub}.`);
        return(this.gitHub);
    }

    // Retrun:  Engineer Class
    getRole() {
        console.log(`Engineer ${Engineer}.`);
        return(Engineer);
    }

}
