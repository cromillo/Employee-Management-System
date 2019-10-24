var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port;
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "DigiKaia3!",
    database: "employeeDb"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Employees By Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "View All Roles",
                "Add Role",
                "Remove Role",
                "View All Departments",
                "Add Department",
                "Remove Department",
                "Quit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    allEmployees();
                    break;

                case "View All Employees By Department":
                    employeesByDept();
                    break;

                case "View All Employees By Manager":
                    employeesByManager();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Update Employee Role":
                    updateRole()
                    break;

                case "Update Employee Manager":
                    updateManager();
                    break;

                case "View All Roles":
                    allRoles();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Remove Role":
                    removeRole();
                    break;

                case "View All Departments":
                    allDepartments();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Remove Department":
                    removeDepartment();
                    break;

                case "Quit":
                    connection.end();
                    break;

            }
        });
}

//NEED TO ADD MANAGERS COLUMN TO TABLE
function allEmployees() {
    connection.query(`SELECT employee.first_name, employee.last_name, employee.role_id, 
        employee_role.title, employee_role.salary, department.dept_name FROM employee LEFT JOIN 
        employee_role ON employee.role_id = employee_role.id LEFT JOIN department ON employee_role.department_id = department.id`, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch()
    });
}

//NEED TO INSERT PROMPT ASKING FOR SPECIFIC DEPARTMENT
function employeesByDept() {
    connection.query(`SELECT department.dept_name, employee.first_name, employee.last_name, employee_role.title, employee_role.salary 
    FROM department JOIN employee_role ON employee_role.department_id = department.id JOIN employee ON employee.role_id = employee_role.id `, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch()
    });
}

//NEED TO INSERT PROMPT ASKING FOR SPECIFIC MANAGER

function employeesByManager() {
    connection.query(`SELECT CONCAT(m.first_name, ' ', m.last_name) AS 'Manager',CONCAT(e.first_name, ' ', e.last_name) AS 'employee'
FROM employee e INNER JOIN employee m ON m.manager_id = e.id ORDER BY Manager;`, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch()
    });
}


//NEED TO ADD EMPLOYEE ..... AND INSERT PROMPT ASKING FOR NAME, ROLE, DEPT
function addEmployee() { 
    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "Enter First Name"
            },
            {
                type: "input",
                name: "last_name",
                message: "Enter Last Name"
            }

        ]).then(function (answer) {
            //console.log(answer.salary);
            connection.query(`INSERT INTO employee (first_name, last_name) VALUES ("${answer.first_name}", "${answer.last_name}")`, function (err, res) {
                if (err) throw err;
                console.table(res);
                runSearch()
            });
        });}



//NEED TO REMOVE EMPLOYEE ..... AND INSERT PROMPT ASKING FOR NAME
function removeEmployee() {  inquirer
    .prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter first name of person to be deleted"
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter last name of person to be deleted"
        }


    ]).then(function (answer) {
        //console.log(answer.role);
        connection.query(`DELETE from employee WHERE first_name = "${answer.first_name}" and last_name = "${answer.last_name}" limit 1`, function (err, res) {
            if (err) throw err;
           // console.table(res);
           runSearch()
        });
    });}




function updateRole() { }


function updateManager() { }


function allRoles() {
    connection.query(`SELECT title FROM employeedb.employee_role`, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch()
    });
}


function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "role",
                message: "Enter New Title"
            },
            {
                type: "input",
                name: "salary",
                message: "Enter Salary"
            }

        ]).then(function (answer) {
            //console.log(answer.salary);
            connection.query(`INSERT INTO employee_role (title, salary) VALUES ("${answer.role}", ${answer.salary})`, function (err, res) {
                if (err) throw err;
                //console.table(res);
                runSearch()
            });
        });}


    function removeRole() {
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "role",
                    message: "Enter title to be deleted"
                },


            ]).then(function (answer) {
                //console.log(answer.role);
                connection.query(`DELETE from employee_role WHERE title = "${answer.role}"`, function (err, res) {
                    if (err) throw err;
                   // console.table(res);
                   runSearch()
                });
            });}
    


    function allDepartments() {
        connection.query(`SELECT dept_name FROM employeedb.department`, function (err, res) {
            if (err) throw err;
            console.table(res);
            runSearch()
        });
    }


    function addDepartment() {
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "department",
                    message: "Enter New Department"
                }

            ]).then(function (answer) {
                //console.log(answer.department);
                connection.query(`INSERT INTO department (dept_name) VALUES ("${answer.department}")`, function (err, res) {
                    if (err) throw err;
                    runSearch()
                });
            });
    }

    function removeDepartment() {
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "department",
                    message: "Enter Department name to be deleted"
                },


            ]).then(function (answer) {
               // console.log(answer.role);
                connection.query(`DELETE from department WHERE dept_name = "${answer.department}"`, function (err, res) {
                    if (err) throw err;
                    //console.table(res);
                    runSearch()
                });
            });}
