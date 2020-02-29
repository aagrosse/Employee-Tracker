const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const connection = require("./db/connection");
const chalk = require('chalk');

require("console.table");

init();

function init () {
    const logoText = logo({name:"Employee Manager"}).render();
    console.log(chalk.green(logoText));

    mainPrompts();
}

async function mainPrompts(){
    inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "view employees",
          "view departments",
          "view roles",
          "add employee",
          "add department",
          "add roles",
          "update an employee role"
        ]
      }
    ])
    .then(function(res) {
      if (res.choice === "view employees") {
        viewEmployees();
      } else if (res.choice === "view departments") {
        viewDepartments();
      } else if (res.choice === "view roles") {
        viewRoles();
      } else if (res.choice === "add employee") {
        addEmployee();
      } else if (res.choice === "add department") {
        addDepartment();
      } else if (res.choice === "add roles") {
        addRoles();
      } else if (res.choice === "update an employee role") {
        updateEmployee();
      }
    });
};

//View Employees
viewEmployees = () => {
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      console.log(chalk.green(res.length + " employees found!"));
      console.table(chalk.yellow("All Employees:"), res);
      // re-prompt the user for another selection
      mainPrompts();
    });
  };

//View Departments
function viewDepartments() {
    connection.query("SELECT * FROM department", function(err, result, fields) {
        if (err) throw err;
        console.log(chalk.green(result.length + " departments found!"));
        console.table(result);
        // re-prompt the user for another selection
        mainPrompts();
      }
    ); 
};

//View Roles
function viewRoles() {
    connection.query(
   "SELECT role.id, role.title, role.salary, role.department_id, department.id, department.name FROM role LEFT JOIN department on role.department_id = department.id",
    function(err, result, fields) {
        if (err) throw err;
        console.log(chalk.green(result.length + " roles found!"));
        console.table(result);
        // re-prompt the user for another selection
        mainPrompts();
      }
    ); 
};

//Add Employee
function addEmployee () {
    connection.query('SELECT * from role; SELECT CONCAT (e.first_name," ",e.last_name) AS full_name FROM employee e', (err, results) => {
        if (err) throw err;
console.log(results);
        inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'What is the first name?'

            },
            {
                name: 'last_name',
                type: 'input',
                message: 'What is the last name?'
            },
            {
                name: 'role',
                type: 'list',
                choices: function () {
                    let choiceArray = results[0].map(choice => choice.title);
                    return choiceArray;
                },
                message: 'What is their role?'

            },
            {
                name: 'manager',
                type: 'list',
                choices: function () {
                    let choiceArray = results[1].map(choice => choice.full_name);
                    return choiceArray;
                },
                message: 'Who is their manager?'

            }
        ]).then((answer) => {
            connection.query(
                `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, 
                (SELECT id FROM role WHERE title = ? ), 
                (SELECT id FROM (SELECT id FROM employee WHERE CONCAT(first_name," ",last_name) = ? ) AS tmptable))`, [answer.first_name, answer.last_name, answer.role, answer.manager]
            )
            mainPrompts();
        })
    })


}


//Add Department
function addDepartment () {
    query = `SELECT name AS "Departments" FROM department`;
    connection.query(query, (err, results) => {
        if (err) throw err;

        console.log('');
        console.table(chalk.yellow('List of current Departments'), results);

        inquirer.prompt([
            {
                name: 'newDept',
                type: 'input',
                message: 'Enter the name of the Department to add:'
            }
        ]).then((answer) => {
            connection.query(`INSERT INTO department(name) VALUES( ? )`, answer.newDept)
            mainPrompts();
        })
    })
}


//Add Roles
function addRoles () {
    connection.query("SELECT * FROM role; SELECT * FROM department", (err, results) => {
        if (err) throw err;

        console.log('');
        console.table(chalk.yellow('List of current Roles:'), results[0]);
        

        inquirer.prompt([
            {
                name: 'newTitle',
                type: 'input',
                message: 'Enter the new Title:'
            },
            {
                name: 'newSalary',
                type: 'input',
                message: 'Enter the salary for the new Title:'
            },
            {
                name: 'dept',
                type: 'list',
                choices: function () {
                    let choiceArray = results[1].map(choice => choice.name);
                    return choiceArray;
                },
                message: 'Select the Department for this new Title:'
            }
        ]).then((answer) => {
            connection.query(
                `INSERT INTO role(title, salary, department_id) 
                VALUES
                ("${answer.newTitle}", "${answer.newSalary}", 
                (SELECT id FROM department WHERE name = "${answer.dept}"));`
            )
            mainPrompts();

        })
    })

}

//Update Employee Role
function updateEmployee() {
    connection.query(`SELECT CONCAT (first_name," ",last_name) AS full_name FROM employee; SELECT title FROM role`, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'empl',
                type: 'list',
                choices: function () {
                    let choiceArray = results[0].map(choice => choice.full_name);
                    return choiceArray;
                },
                message: 'Select an employee to update their role:'
            },
            {
                name: 'newRole',
                type: 'list',
                choices: function () {
                    let choiceArray = results[1].map(choice => choice.title);
                    return choiceArray;
                }
            }
        ]).then((answer) => {
            connection.query(`UPDATE employee 
            SET role_id = (SELECT id FROM role WHERE title = ? ) 
            WHERE id = (SELECT id FROM(SELECT id FROM employee WHERE CONCAT(first_name," ",last_name) = ?) AS tmptable)`, [answer.newRole, answer.empl], (err, results) => {
                    if (err) throw err;
                    mainPrompts();
                })
        })


    })

}