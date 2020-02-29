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
('Michael', 'Scott', 1, NULL),
('Pam', 'Beesly', 6, 1),
('Jim', 'Halpert', 2, 1),
('Toby', 'Flenderson', 4, 1),
('Stanley', 'Hudson', 2, 1),
('Kevin', 'Malone', 7, 1),
('Oscar', 'Martinez', 7, 1),
('Dwight', 'Schrute', 2, 1),
('Angela', 'Martin', 7, 1),
('Darryl', 'Philbin', 3, 1);