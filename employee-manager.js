let mysql = require("mysql");
let inquirer = require("inquirer");
let consoleTable = require("console.table");

// Define connection to local database
let connection = mysql.createConnection({
    host: "localhost",

    // Port
    port: 3306,

    // Username
    user: "root",

    // Password
    password: "12345",
    
    // Database to use
    database: "employee_trackerDB"
});

// Establish connection
connection.connect(function(err) {
    if (err) throw err;
    mainSearch();
});


// Search functions
function mainSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What action would you like to perform?",
            choices: [
                "Departments - View, Add, or Delete",
                "Roles - View, Add, or Delete",
                "Employee - View, Add, Update, or Delete"
            ]
        })
        .then(function(answer) {
            switch(answer.action) {
            case "Departments - View, Add, or Delete":
                deptSearch();
                break;
            
            case "Roles - View, Add, or Delete":
                roleSearch();
                break;

            case "Employee - View, Add, Update, or Delete":
                empSearch();
                break;
            }
        });
}

function deptSearch() {
    inquirer
        .prompt({
            name: "department",
            type: "list",
            message: "Which department task would you like to perform?",
            choices: [
                "View all departments",
                "Add a department",
                "Delete a department"
            ]
        })
        .then(function(answer) {
            switch (answer.department) {
            case "View all departments":
                viewDept();
                break;
            
            case "Add a department":
                addDept();
                break;

            case "Delete a department":
                delDept();
                break;
            }            
        });
}