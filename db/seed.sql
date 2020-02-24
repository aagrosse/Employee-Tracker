use employees

INSERT INTO department (name)

VALUES 
('Management'),
('Sales'),
('Warehouse'),
('Human Resources'),
('Quality Control'),
('Office Management'),
('Accounting');

INSERT INTO role(title, salary, department_id)
VALUES
('Regional Manager', 100000, 1),
('Sales Rep', 67000, 2),
('HR Rep', 72000, 4),
('Warehouse Worker', 45000, 3),
('Receptionist', 47000, 6),
('Accountant', 89000, 7);

INSERT INTO employee(first_name, last_name, role_id, manager_id) 
VALUES
('Michael', 'Scott', 1,1),
('Pam', 'Beesly', 6, NULL),
('Jim', 'Halpert', 2, NULL),
('Toby', 'Flenderson', 4, NULL),
('Stanley', 'Hudson', 2, NULL),
('Kevin', 'Malone', 7, NULL),
('Oscar', 'Martinez', 7, NULL),
('Dwight', 'Schrute', 2, NULL),
('Angela', 'Martin', 7, NULL),
('Darryl', 'Philbin', 3, NULL);