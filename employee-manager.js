let mysql = require("mysql");
let inquirer = require("inquirer");
let cTable = require("console.table");
const observe = require("inquirer/lib/utils/events");

// Global variables
let deptList = [];
let roleList = [];
let empList = [];
let choicesDeptList = [];
let choicesRoleList = [];
let choicesEmpList = [];


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
    let queryString = "SELECT * FROM department";

    return new Promise((resolve, reject) => {
        connection.query(queryString, function(err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });    
}

function viewDept() {
    
    let queryString = "SELECT * FROM department";

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
                console.log(`
                Successfully added ${answer.addDept} department.

                `);

                mainSearch();
            });
        });
}

function delDept () {

    listDept().then(res => {
        
        choicesDeptList = [];

        for (let i = 0; i < res.length; i++) {
            let obj = {};
            obj["id"] = res[i].id;
            obj["name"] = res[i].name;

            deptList.push(obj);
            choicesDeptList.push(obj.name);
        }

        inquirer
            .prompt({
                name: "delDept",
                type: "list",
                message: "Which department would you like to delete?",
                choices: choicesDeptList
            })
            .then(function(answer) {
                let queryString = "DELETE FROM department WHERE name=?";
    
                connection.query(queryString, answer.delDept, function(err, res) {
                    if (err) throw err;
    
                    console.clear();
                    console.log(`
                    Successfully deleted ${answer.delDept} department.
                    
                    `);                

                    mainSearch();
                });
            });
    });
}

function deptBudget () {

}


// Role functions
function roleSearch() {
    inquirer
        .prompt({
            name: "role",
            type: "list",
            message: "Which role task would you like to perform?",
            choices: [
                "View all roles",
                "Add a role",
                "Delete a role"
            ]
        })
        .then(function(answer) {
            switch (answer.role) {
            case "View all roles":
                viewRole();
                break;
            
            case "Add a role":
                addRole();
                break;

            case "Delete a role":
                delRole();
                break;
            }            
        });
}

function listRole() {
    let queryString = "SELECT * FROM role";

    return new Promise((resolve, reject) => {
        connection.query(queryString, function(err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });    
}

function viewRole() {
    
    let queryString = "SELECT * FROM role";

    connection.query(queryString, function (err, res) {

        if (err) throw err;
        
        console.clear();
        console.table(res);

        mainSearch();
    });
}

function addRole() {

    listDept().then(res => {

        choicesDeptList = [];

        for (let i = 0; i < res.length; i++) {
            let obj = {};
            obj["id"] = res[i].id;
            obj["name"] = res[i].name;

            deptList.push(obj);
            choicesDeptList.push(obj.name);
        }
        
        inquirer
            .prompt([
            {    
                name: "title",
                type: "input",
                message: "What is the title of the role you'd like to add?",
                validate: (value) => {
                    if (value === "" || value === null) {
                        return "You must enter a value!";
                    } else if (isNaN(value)) {
                        return true;
                    } else {
                        return "Role title can't be a number.";
                    }
                }
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of this role?",
                validate: (value) => {
                    if (value === "" || value === null) {
                        return "You must enter a value!";
                    } else if (isNaN(value)) {
                        return "Salary must be a number.";
                    } else {
                        return true;
                    }
                }
            },
            {
                name: "department",
                type: "list",
                message: "Which department does this role belong to?",
                choices: choicesDeptList
            }])
            .then(function(answer) {
                let roleId;

                function func () {
                    for (let i = 0; i < deptList.length; i++) {
                        if (deptList[i].name === answer.department) {
                            return deptList[i].id;                            
                        }
                    }
                };

                roleId = func();

                let queryString = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
    
                connection.query(queryString, [answer.title, answer.salary, roleId], function(err, res) {
                    if (err) throw err;
                    
                    console.clear();
                    console.log(`                    
                    Successfully added ${answer.title} role.
    
                    `);
    
                    mainSearch();
                });
            });        
    });
}

function delRole () {

    listRole().then(res => {

        choicesRoleList = [];
        
        for (let i = 0; i < res.length; i++) {
            let obj = {};
            obj["id"] = res[i].id;
            obj["title"] = res[i].title;

            roleList.push(obj);
            choicesRoleList.push(obj.title);
        }
        
        inquirer
            .prompt({
                name: "delRole",
                type: "list",
                message: "Which role would you like to delete?",
                choices: choicesRoleList
            })
            .then(function(answer) {
                let queryString = "DELETE FROM role WHERE title=?";
    
                connection.query(queryString, answer.delRole, function(err, res) {
                    if (err) throw err;
    
                    console.clear();
                    console.log(`
                    Successfully deleted ${answer.delRole} department.

                    `);          
                    
                    mainSearch();
                });
            });
    });
}


// Employee functions
function empSearch() {
    inquirer
        .prompt({
            name: "emp",
            type: "list",
            message: "Which employee task would you like to perform?",
            choices: [
                "View all employees",
                "Add an employee",
                "Delete an employee"
            ]
        })
        .then(function(answer) {
            switch (answer.emp) {
            case "View all employees":
                viewEmp();
                break;
            
            case "Add an employee":
                addEmp();
                break;

            case "Delete an employee":
                delEmp();
                break;
            }            
        });
}

function listEmp() {
    let queryString = "SELECT * FROM employee";

    return new Promise((resolve, reject) => {
        connection.query(queryString, function(err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });    
}

function viewEmp() {
    
    let queryString = "SELECT * FROM employee";

    connection.query(queryString, function (err, res) {

        if (err) throw err;
        
        console.clear();
        console.table(res);

        mainSearch();
    });
}

function addEmp() {

    listRole().then(roles => {

        choicesRoleList = [];

        for (let i = 0; i < roles.length; i++) {
            let obj = {};
            obj["id"] = roles[i].id;
            obj["title"] = roles[i].title;
            obj["salary"] = roles[i].salary;
            obj["department_id"] = roles[i].department_id;

            roleList.push(obj);
            choicesRoleList.push(obj.title);
        }
        
        listEmp().then(emps => {

            choicesEmpList = [];

            for (let i = 0; i < emps.length; i++) {
                let obj = {};
                obj["id"] = emps[i].id;
                obj["first_name"] = emps[i].first_name;
                obj["last_name"] = emps[i].last_name;
                obj["role_id"] = emps[i].role_id;
                obj["manager_id"] = emps[i].manager_id;
    
                empList.push(obj);
                choicesEmpList.push(obj.first_name + " " + obj.last_name);
            }


            inquirer
                .prompt([
                {    
                    name: "fname",
                    type: "input",
                    message: "What is the first name of the new employee?",
                    validate: (value) => {
                        if (value === "" || value === null) {
                            return "You must enter a value!";
                        } else if (isNaN(value)) {
                            return true;
                        } else {
                            return "First name can't be a number.";
                        }
                    }
                },
                {
                    name: "lname",
                    type: "input",
                    message: "What is the last name of the new employee?",
                    validate: (value) => {
                        if (value === "" || value === null) {
                            return "You must enter a value!";
                        } else if (isNaN(value)) {
                            return true;
                        } else {
                            return "Last name can't be a number.";
                        }
                    }
                },
                {
                    name: "role",
                    type: "list",
                    message: "What is the new employee's role?",
                    choices: choicesRoleList
                },
                {
                    name: "manager",
                    type: "list",
                    message: "Who is the new employee's manager?",
                    choices: choicesEmpList
                }
            ])
                .then(function(answer) {
                    let roleId;
                    let manId;
    
                    function getRoleId () {
                        for (let i = 0; i < roleList.length; i++) {
                            if (roleList[i].title === answer.role) {
                                return roleList[i].id;                            
                            }
                        }
                    };

                    function getManId () {
                        for (let i = 0; i < empList.length; i++) {
                            const chosenManager = answer.manager.split(" ");

                            if (empList[i].first_name === chosenManager[0] && empList[i].last_name === chosenManager[1]) {
                                return empList[i].id;                            
                            }
                        }
                    };
    
                    roleId = getRoleId();
                    manId = getManId();

                    console.log(`
                    Role ID equals ${roleId}
                    
                    Manager ID equals ${manId}`);
    
                    // let queryString = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
        
                    // connection.query(queryString, [answer.title, answer.salary, roleId], function(err, res) {
                    //     if (err) throw err;
                        
                    //     console.clear();
                    //     console.log(`                    
                    //     Successfully added ${answer.title} role.
        
                    //     `);
        
                    //     mainSearch();
                    // });
                });   
        });
    });
}

function delRole () {

    listRole().then(res => {
        
        let choicesList = [];
        for (let i = 0; i < res.length; i++) {
            let obj = {};
            obj["id"] = res[i].id;
            obj["title"] = res[i].title;

            roleList.push(obj);
            choicesList.push(obj.title);
        }
        
        inquirer
            .prompt({
                name: "delRole",
                type: "list",
                message: "Which role would you like to delete?",
                choices: choicesList
            })
            .then(function(answer) {
                let queryString = "DELETE FROM role WHERE title=?";
    
                connection.query(queryString, answer.delRole, function(err, res) {
                    if (err) throw err;
    
                    console.clear();
                    console.log(`
                    Successfully deleted ${answer.delRole} department.

                    `);          
                    
                    mainSearch();
                });
            });
    });
}