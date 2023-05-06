USE employeeChecker_db;
INSERT INTO departments (department_name)
VALUES
('Engineering'),
('Sales'),
('Finance'),
('Legal'),
('HR'),
('Marketing'),
('Customer Seervice'),
('Administration');	




INSERT INTO roles ( title, salary, department_id) 
VALUES 
('Software Engineer', 100000, 1),
('Account Manager', 130000, 2),
('Accountant', 160000, 3),
('Legal Team Lead', 250000, 4),
('Human Resources Manager', 190000, 5),
('Marketing Manager', 180000, 6),
('Customer Service Manager', 160000, 7),
('Administration Manager', 150000, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Emma', 'Thompson', 1, NULL),
('Benjamin', 'Wilson', 1, 1),
('Olivia', 'Parker', 2, NULL ),
('Jack', 'Edwards', 3, 3),
('Chloe', 'Green', 4, NULL),
('Nathan', 'Patel', 5, NULL),
('Snoop', 'Dogg', 6, NULL),
('Leah', 'Anderson', 7, NULL),
('William', 'Brown', 8, NULL);


