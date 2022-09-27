/* *****************************************************
  Created a TEST for each attribute in the Module Class.
******************************************************** */
const ClassModule = require("../lib/Intern");

// Test Data     Name     ID     Email               School
const params = ["Brian", "001", "bzoulko@gmail.com", "UCSD"];
const TITLE = "Intern";

// Test Name
test("Name of " + TITLE, () => {
    const clsMod  = new ClassModule(...params);
    expect(clsMod.name).toBe(params[0]);
})

// Test ID
test("ID of " + TITLE, () => {
    const clsMod  = new ClassModule(...params);
    expect(clsMod.id).toBe(params[1]);
})

// Test Email
test("Email of " + TITLE, () => {
    const clsMod  = new ClassModule(...params);
    expect(clsMod.email).toBe(params[2]);
})

// Test School
test("School of " + TITLE, () => {
    const clsMod  = new ClassModule(...params);
    expect(clsMod.school).toBe(params[3]);
})
