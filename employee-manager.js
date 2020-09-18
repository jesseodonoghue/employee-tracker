let mysql = require("mysql");
let inquirer = require("inquirer");
let cTable = require("console.table");

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


// Main function
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

// Department functions
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

function listDept() {
    let queryString = "SELECT name FROM department";

    return new Promise((resolve, reject) => {

        connection.query(queryString, function(err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });

    })
    .then(val => {
        return val;
    });
    
}

function viewDept() {
    
    let queryString = "SELECT name FROM department";

    connection.query(queryString, function (err, res) {

        if (err) throw err;
        
        console.clear();
        console.table(res);

        mainSearch();
    });
}

function addDept() {

    inquirer
        .prompt({

            name: "addDept",
            type: "input",
            message: "What is the name of the department you'd like to add?",
            validate: (value) => {
                if (value === "" || value === null) {
                    return "You must enter a value!";
                } else if (isNaN(value)) {
                    return true;
                } else {
                    return "Department name can't be a number.";
                }
            }
        })
        .then(function(answer) {
            let queryString = "INSERT INTO department (name) VALUES (?)";

            connection.query(queryString, answer.addDept, function(err, res) {
                if (err) throw err;
                
                console.clear();
                console.log("Successfully added department named " + answer.addDept);

                mainSearch();
            });
        });
}

function delDept () {

    let deptList = listDept();

    console.log(deptList);

    // inquirer
    //     .prompt({
    //         name: "delDept",
    //         type: "input",
    //         message: "What is the name of the department you'd like to delete?",
    //         validate: (value) => {
    //             if (value === "" || value === null) {
    //                 return "You must enter a value!";
    //             } else if (isNaN(value)) {
    //                 return true;
    //             } else {
    //                 return "Department name can't be a number.";
    //             }
    //         }
    //     })
    //     .then(function(answer) {
    //         let queryString = "DELETE FROM department WHERE name=?";

    //         connection.query(queryString, answer.delDept, function(err, res) {
    //             if (err) throw err;

    //             if (res.rowsAffected === 0) {
    //                 console.clear();
    //                 console.log("No department found named " + answer.delDept);
    //             } else {
    //                 console.clear();
    //                 console.log("Successfully deleted department named " + answer.delDept);
    //             }
    //         })
    //     })

}