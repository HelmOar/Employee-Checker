const inquirer = require('inquirer');
const mysql = require('mysql2');

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Egypt2023',
    database: 'employeeChecker_db'
});

// connect to the database and start the application
connection.connect((err) => {
    if (err) 
        throw err;
    
    console.log("Connection to database successful!");
    start();
});

// function to start the application and prompt the user for what they would like to do

function start() {
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
            'Update an employee role',
            "Delete an employee",
            
            'Exit'
        ]

    }).then((answer) => {
        switch (answer.action) {
            case 'View all employees': viewAllEmployees();
                break;
            case 'View all roles': viewAllRoles();
                break;
            case 'View all departments': viewAllDepartments();
                break;
            case 'Add an employee': addEmployee();
                break;
            case 'Add a role': addRole();
                break;
            case 'Add a department': addDepartment();
                break;
            case 'Update an employee role': updateEmployeeRole();
                break;
            case 'Delete an employee': deleteEmployee();
                break;
            case 'Exit': connection.end();
                console.log('Exiting application')
                break;
        }
    });
}

// function to view all employees and restart application
function viewAllEmployees() {
    const query = `SELECT first_name, last_name, title, salary, department_name, manager_id FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id`;

    connection.query(query, (err, res) => {
        if (err) 
            throw err;
        
        console.table(res);
        start();
    });
}

// function to view all roles and restart application
function viewAllRoles() {
    const query = `SELECT * FROM roles`;
    connection.query(query, (err, res) => {
        if (err) 
            throw err;
        
        console.table(res);
        start();
    });
}

// function to view all departments and restart application
function viewAllDepartments() {
    const query = 'SELECT * FROM departments';
    connection.query(query, (err, res) => {
        if (err) 
            throw err;
        
        console.table(res);
        start();
    });
}

// function to add a department and restart application
function addDepartment() {
    inquirer.prompt({type: 'input', name: 'name', message: 'Enter the name of the new department.'})
    .then((answer) => { // console.log(answer.name);
        const query = `INSERT INTO departments (department_name) VALUES ('${
            answer.name
        }')`;
        connection.query(query, (err, res) => {
            if (err) 
                throw err;
            
            console.log('Department added!');
            start();
        });
    });
}

// function to add a role and restart application
function addRole() {
    const query = 'SELECT * FROM departments';
    connection.query(query, (err, res) => {
        if (err) 
            throw err;
        
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the title of the new role.'
            }, {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary of the new role.'
            }, {
                type: 'list',
                name: 'department',
                message: 'Select the department of the new role.',
                choices: res.map((department) => department.department_name)
            },
        ]).then((answer) => {
            const department = res.find((department) => department.department_name === answer.department);
            const query = 'INSERT INTO roles SET ?';
            connection.query(query, {
                title: answer.title,
                salary: answer.salary,
                department_id: department.id
            }, (err, res) => {
                if (err) 
                    throw err;
                
                console.log('Role added!');
                start();
            });
        });
    });
}
// function to add emplyee and restart application
function addEmployee() {
    connection.query('SELECT id, title FROM roles', (err, res) => {
        if (err) 
            throw err;
        
        connection.query('SELECT id, first_name, last_name FROM employee', (err, resRoles) => {
            if (err) 
                throw err;
            
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'Enter the first name of the new employee.'
                }, {
                    type: 'input',
                    name: 'last_name',
                    message: 'Enter the last name of the new employee.'
                }, {
                    type: 'list',
                    name: 'rolesId',
                    message: 'Select the role of the new employee.',
                    choices: res.map((role) => { // console.log(role);
                        return {name: role.title, value: role.id};
                    })
                }, {
                    type: 'list',
                    name: 'managerId',
                    message: 'Select the manager ID of the new employee.',
                    choices: resRoles.map((emp) => {
                        return {
                            name: emp.first_name + ' ' + emp.last_name,
                            value: emp.id
                        };
                    })
                },

            ]).then((answer) => {
                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                // console.log("This is the one ",answer);
                const values = [answer.first_name, answer.last_name, answer.rolesId, answer.managerId,];

                connection.query(sql, values, (err, res) => {
                    if (err) 
                        throw err;
                    
                    console.log('Employee added!');
                    start();
                });
            });
        });


        // get list from data base


    })

}
// function delete employee
function deleteEmployee() {
    connection.query('SELECT id, first_name, last_name FROM employee', (err, res) => {
        if (err) 
            throw err;
        
        inquirer.prompt([{
                type: 'list',
                name: 'employee',
                message: 'Select the employee you would like to delete.',
                choices: res.map((emp) => {
                    return {
                        name: emp.first_name + ' ' + emp.last_name,
                        value: emp.id
                    };
                })
            },]).then((answer) => {
            const sql = `DELETE FROM employee WHERE id = ?`;
            // console.log("This is the one ",answer);
            const value = answer.employee;

            connection.query(sql, value, (err, res) => {
                if (err) 
                    throw err;
                
                console.log('Employee removed!');
                start();
            });
        })
    })
}


// function to update employee role and restart application
function updateEmployeeRole() {
    const queryEmployees = 'SELECT employee.id, employee.first_name, employee.last_name, roles.title FROM employee LEFT JOIN roles ON employee.role_id = roles.id';
    const queryRoles = 'SELECT * FROM roles';
    connection.query(queryEmployees, (err, employees) => {
        if (err) 
            throw err;
        
        connection.query(queryRoles, (err, resRoles) => {
            if (err) 
                throw err;
            
            // console.log(resRoles);
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Select the employee you would like to update.',
                    choices: employees.map((employee) => `${
                        employee.first_name
                    } ${
                        employee.last_name
                    }`)
                }, {
                    type: 'list',
                    name: 'role',
                    message: 'Select the new role of the employee.',
                    choices: resRoles.map((role) => role.title)
                }
            ]).then((answer) => {
                const employee = employees.find((employee) => `${
                    employee.first_name
                } ${
                    employee.last_name
                }` === answer.employee);
                const role = resRoles.find((role) => role.title === answer.role);
                const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
                connection.query(query, [
                    role.id, employee.id
                ], (err, res) => {
                    if (err) 
                        throw err;
                    
                    console.log('Role updated!');
                    // restart application
                    start();
                });
            });
        });
    });
}
