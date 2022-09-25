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
            <link rel="stylesheet" href="../dist/reset.css" />
            <link rel="stylesheet" href="../dist/style.css" />
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
        
            <!-- Used to add cards to the web page systematically. -->
            <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

        </body>
        `
        return(htmlTemplate);
    },

    addEmployee: function (name, occupation, id, email, type, typeDetail) {
        
        let employeeCard = `
            <section>
                <section class="card">
                    <div>
                        <p class="header-line1">${name}</p>
                        <p class="header-line2">${occupation}</p>
                    </div>
                    <div class="card-bottom">
                        <div class="card-inside">ID: ${id}</div>
                        <div class="card-inside">Email:
                            <a class="email-link">${email}</a>
                        </div>
                        <div class="card-inside">${type}:
                            <a>${typeDetail}</a>
                        </div>
                    </div>
                </section>
            </section>
        `;

        return(employeeCard);
    },

};
