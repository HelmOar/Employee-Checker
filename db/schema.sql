DROP DATABASE IF EXISTS employeeChecker_db;
CREATE DATABASE employeeChecker_db;
USE employeeChecker_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT,
    FOREIGN KEY (department_id) 
    REFERENCES departments(id)
    ON DELETE CASCADE
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) 
    REFERENCES roles(id)
    ON DELETE CASCADE,
    FOREIGN KEY (manager_id) 
    REFERENCES employee(id)
    ON DELETE SET NULL
);
