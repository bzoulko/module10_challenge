/* *****************************************************
  Created a TEST for each attribute in the Module Class.
******************************************************** */
const ClassModule = require("../lib/Manager");

// Test Data     Name     ID     Email               Office Number
const params = ["Brian", "001", "bzoulko@gmail.com", "7215"];
const TITLE = "Manager";

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

// Test Office Number
test("Office Number of " + TITLE, () => {
    const clsMod  = new ClassModule(...params);
    expect(clsMod.officeNumber).toBe(params[3]);
})
