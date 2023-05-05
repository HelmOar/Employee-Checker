USE employeeChecker_db
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
('Emma', 'Thompson', 1, 1),
('Benjamin', 'Wilson', 2, 2),
('Olivia', 'Parker', 3, 3 ),
('Jack', 'Edwards', 4, 4),
('Chloe', 'Green', 5, 5),
('Nathan', 'Patel', 6, 6),
('Leah', 'Anderson', 7, 7),
('William', 'Brown', 8, 8);


