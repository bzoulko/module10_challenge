# Module 10 Challenge Project - Object-Oriented Programming - Team Profile Generator
This program is a CLI application using node.js to run it. After starting the application your prompted to enter a team manager and several key features about the manager. Then a menu selection comes up asking you to add an Engineer to the team or an Intern or select Finished to exit. Selecting Finished will compile all team members added and finalize the index.html, then runs it in a new browser window for you to review.


## Running the Team Profile Generator.
* From the Terminal prompt, in this projects main folder, type "npm start". This will start the Team Profile Generator application that will being prompting for a Manager and detail on that manager along with two additional types of employees, Engineer's and/or Intern's.

* Adding a Team <b>Manager</b>, you'll be prompted to enter the following:
    - Name          ( No Validation )
    - ID            ( Validated to all numerics. )
    - Email         ( Must formulate a valid Email address. )
    - Office Number ( Validated to all numerics. )

* Adding a Team <b>Engineer</b>, you'll be prompted to enter the following:
    - Name          ( No Validation )
    - ID            ( Validated to all numerics. )
    - Email         ( Must formulate a valid Email address. )
    - GitHub        ( No Validation )

* Adding an <b>Intern</b>, you'll be prompted to enter the following:
    - Name          ( No Validation )
    - ID            ( Validated to all numerics. )
    - Email         ( Must formulate a valid Email address such as, nnnnn@ssss.com )
    - School        ( No Validation )

Upon entering these team members and the specs for each, some fields will be validated and you will cnot be able to continue until you've entered the requested information in the correct format.


### Testing Class Modules:
* Run testing at the terminal prompt by typing "npm test".

* 15 tests will be conducted on the class modules to prove they work efficiently and effectivly:
    - 3 tests on the Employee's class module.
        - ID, Name, Email
    - 4 tests on the Managers's class module.
        - Extends Employee => ( ID, Name, Email ), & Office Number
    - 4 tests on the Engineer's class module.
        - Extends Employee => ( ID, Name, Email ), & GitHub
    - 4 tests on the Intern's class module. 
        - Extends Employee => ( ID, Name, Email ), & School

* The number of tests was determined by the number of arguments passed to each class module. Each argument must undergo an integrity test to ensure the data is not lost and logically the routines do not fail.


### Special Notes:
* The index.js file contains a majority of the logic for this application.

* Class modules can be found under <b>lib</b>, which assist in gathering the necessary arguments for each type of team member.

* Test modules can be found under <b>_test_</b>, which helps to ensure each class modules effectiveness.

* Under <b>dist</b> there's a <b>reset.css</b> and <b>style.css</b> to assist in styling the index.html, which is generated by the application, to  display all elements in the expected fashion per our module 10 challenge requirements.

* Under <b>src</b> there's the htmlTemplate module which supplies the application with a base for the Team Profiles before any team members are added.

* Link to walkthrough video.
https://drive.google.com/file/d/14DzLTL5-Aj-2XCh-BK5h1KnexE9ckn6b/view


### Screen Shots.
* npm test
![image](https://user-images.githubusercontent.com/108200823/192569889-4d01607d-a06f-46f9-b05b-65ae07149a58.png)


* npm start
![image](https://user-images.githubusercontent.com/108200823/192570102-af47c256-7164-4f7e-964d-c16bc68f598e.png)
![image](https://user-images.githubusercontent.com/108200823/192570263-ead6b391-29bc-4a38-a0ea-c2f7318976e9.png)


