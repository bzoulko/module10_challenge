/*
    Created:    09/22/2022 
    Programmer: Brian Zoulko
    Notes:      Devopled function for HTML Template and methods.

    Modification
    ============
    09/22/2022 Brian Zoulko    Initial creation of method.    
*/

module.exports = {

    getHTMLTemplate: function (documentTitle, webPageTitle) {
        const htmlTemplate = 
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="reset.css" />
            <link rel="stylesheet" href="style.css" />
            <title>${documentTitle}</title>
        </head>
        
        <body>
        
            <header>
                <h1>${webPageTitle}</h1>
            </header>

            <main>    
                <form class="form-content">                                    
                </form>    
            </main>
        
        </body>
        `
        return(htmlTemplate);
    },

};
