const inquirer = require('inquirer');
const mysql = require('mysql');

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Egypt2023',
    database: 'employeeTracker_db',
});

//connect to the database and start the application
connection.connect((err) => {
    if (err) throw err;
    console.log("Connection to database successful!");
    start();
});

//function to start the application and prompt the user for what they would like to do

function start () {
   inquirer.prompt({
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
            // 'Add a manager',
            'Update an employee role',
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
            // case 'Add a manager':
            //     addManager();
            //     break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            // case 'View employees by manager':
            //     viewEmployeesByManager();
            //     break;
            // case 'View employees by department':
            //     viewEmployeesByDepartment();
            //     break;
            // case 'Delete an employee':
            //     deleteEmployee();
            //     break;
            // case 'Delete a role':
            //     deleteRole();
            //     break;
            // case 'Delete a department':
            //     deleteDepartment();
            //     break;
            // case 'View the total utilized budget of a department':
            //     viewTotalBudget();
            //     break;
            case 'Exit':
                connection.end();
                console.log('Exiting application')
                break;
        }
    });

    //function to view all employees and restart application
    function viewAllEmployees() {
        const query = `
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON manager.id = employee.manager_id;
        `;
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            start();
        });
    }

//function to view all roles and restart application
    function viewAllRoles() {
        const query = 'SELECT role.titles,roles.id, departments.department_name, roles.salary FROM roles JOIN departmenets on roles.department_id = departments.id';
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            start();
        });
    }

        //function to view all departments and restart application
    function viewAllDepartments() {
        const query = 'SELECT * FROM department';
        connection.query( query, (err, res) => {
            if (err) throw err;
            console.table(res);
            start();
        });
    }

        //function to add a department and restart application
    function addDepartment() {
        inquirer.prompt({
            
                type: 'input',
                name: 'department_name',
                message: 'Enter the name of the new department.',
            }),

        then((answer) =>   {
            console.log(answer.name);
            const query = `INSERT INTO departments (department_name) VALUES ('${answer.name}')`;
            connection.query (query, (err, res) => {
                if (err) throw err;
                console.log('Department added!');
                start();
            });
        });
    }
            
        //function to add a role and restart application
    function addRole() {
        const query = 'SELECT * FROM departments';
        connection.query(query, (err, res) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the title of the new role.',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the salary of the new role.',
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'Select the department of the new role.',
                    choices: res.map((department) => department.department_name),
                },
            ])
            .then((answer) => {
                const department = res.find(
                    (department) => department.name === answer.department
                );
                const query = 'INSERT INTO roles SET ?';
                connection.query(
                    query,
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: department.id,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log('Role added!');
                        start();
                    }
                );
            });
        });
    }
        //function to add emplyee and restart application
    function addEmployee() {
        //get list from data base
        connection.query("SELECT id, title FROM roles" , (err, res) => {
            if (err) {
                console.log("error");
                return;
            }
            const roles = results.map (({id , title}) => ({
                name: title,
                value: id,
            }));
        });
    }
    

    //function to update employee role and restart application
    function updateEmployeeRole () {
        const queryEmployees =
        'SELECT employee.id, employee.first_name, employee.last_name, roles.title FROM employee LEFT JOIN roles ON employee.role_id = roles.id';
        const queryRoles = 'SELECT * FROM roles';
        connection.query(queryEmployees, (err, employees) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Select the employee you would like to update.',
                    choices: currentEmployees.map (
                        (employee) => `${employee.first_name} ${employee.last_name}`
                    ),
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Select the new role of the employee.',
                    choices: currentRoles.map((role) => role.title),
                }
            ])
            .then((answer) => {
                const employee = currentEmployees.find(
                    (employee) =>
                    `${employee.first_name} ${employee.last_name}` === answer.employee
                );
                const role = currentRoles.find(
                    (role) => role.title === answer.role);
                const query = 'UPDATE employee SET role_id ? WHERE ?';
                connection.query(
                    query,
                    [role.id, employee.id],
                    (err, res) => {
                        if (err) throw err;
                        console.log('Role updated!');
                        //restart application
                        start();
                    }
                );
            });
        });
    };

    }


