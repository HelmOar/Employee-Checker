INSERT INTO department (department_id, department_name)
VALUES
(1, 'Engineering'),
(2, 'Sales'),
(3, 'Finance'),
(4, 'Legal'),
(5, 'HR'),
(6, 'Marketing'),
(7, 'Customer Seervice'),
(8, 'Administration');	




INSERT INTO roles (role_id, title, salary, department_id) 
VALUES 
(001,'Software Engineer', 100000, 1),
(002, 'Account Manager', 130000, 2),
(003,'Accountant', 160000, 3),
(004,'Legal Team Lead', 250000, 4),
(005,'Human Resources Manager', 190000, 5)
(006,'Marketing Manager', 180000, 6),
(007,'Customer Service Manager', 160000, 7),
(008,'Administration Manager', 150000, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Emma', 'Thompson', 001, 101 ),
('Benjamin', 'Wilson'002, 103),
('Olivia', 'Parker'003,104 ),
('Jack', 'Edwards'004, 105 ),
('Chloe', 'Green' 005, 106),
('Nathan', 'Patel'006, 109),
('Leah', 'Anderson'007, 109),
('William', 'Brown'008, 109),
--('Megan', 'Ross'),
--('Ethan', 'Reynolds');

