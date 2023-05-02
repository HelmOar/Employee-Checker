const inquirer = require('inquirer');
const mysql = require('mysql');

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Egypt2023',
    database: 'employee_trackerDB',
});

//connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log("Connection to database successful!");
    start();
});

//function to start the application and prompt the user for what they would like to do

function start () {
    .prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all employees',	
            'View all roles',
            'View all departments',
            'Add an employee',
            'Add a role',
            'Add a department',
            'Add a manager',
            'Update an employee role',
            'View employees by manager',
            'View employees by department',
            'Delete an employee',
            'Delete a role',
            'Delete a department',
            'View the total utilized budget of a department',
            'Exit'
        ],

    })
    .then((answer) => {
        switch (answer.action) {
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a manager':
                addManager();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'View employees by manager':
                viewEmployeesByManager();
                break;
            case 'View employees by department':
                viewEmployeesByDepartment();
                break;
            case 'Delete an employee':
                deleteEmployee();
                break;
            case 'Delete a role':
                deleteRole();
                break;
            case 'Delete a department':
                deleteDepartment();
                break;
            case 'View the total utilized budget of a department':
                viewTotalBudget();
                break;

    
}