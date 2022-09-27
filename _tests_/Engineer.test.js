/* *****************************************************
  Created a TEST for each attribute in the Module Class.
******************************************************** */
const ClassModule = require("../lib/Engineer");

// Test Data     Name     ID     Email               GitHub
const params = ["Brian", "001", "bzoulko@gmail.com", "https://github.com/bzoulko"];
const TITLE = "Engineer";

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

// Test GitHub
test("GitHub of " + TITLE, () => {
    const clsMod  = new ClassModule(...params);
    expect(clsMod.gitHub).toBe(params[3]);
})
