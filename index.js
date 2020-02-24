const {prompt} = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

init();

function init () {
    const logoText = logo({name:"Employee Manager"}).render();
    console.log(logoText);

    mainPrompts();
}

async function mainPrompts(){
    const{choice} = await prompt([
        {type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices:[
            {
            name: "View all employees",
            value: "VIEW_EMPLOYEES"
            },
            // {
            // name: "View all employees by department",
            // value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
            // },
            // {
            // name: "View all employees by manager",
            // value: "VIEW_EMPLOYEES_BY_MANAGER"
            // },
            {
            name: "Add employee",
            value: "ADD_EMPLOYEE"
            },
            // {
            // name: "Remove employee",
            // value: "REMOVE_EMPLOYEE"
            // },
            {
            name: "Update employee role",
            value: "UPDATE_EMPLOYEE_ROLE"
            },
            // {
            // name: "Update employee manager",
            // value: "UPDATE_EMPLOYEE_MANAGER"
            // },
            {
            name: "View all roles",
            value: "VIEW_ROLES"
            },
            {
            name: "Add role",
            value: "ADD_ROLE"
            },
            // {
            // name: "Remove role",
            // value: "REMOVE_ROLE"
            // },
            {
            name: "View all departments",
            value: "VIEW_DEPARTMENTS"
            },
            {
            name: "Add department",
            value: "ADD_DEPARTMENT"
            },
            // {
            // name: "Remove department",
            // value: "REMOVE_DEPARTMENT"
            // },
             // {
            // name: "Utilized budget of each department",
            // value: "DEPARTMENT_BUDGET"
            // },
        ]
    }
    ]

    )
}