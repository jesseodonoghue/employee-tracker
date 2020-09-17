INSERT INTO department (name) VALUES ('Legal');
INSERT INTO department (name) VALUES ('Accounting');
INSERT INTO department (name) VALUES ('Software Development');
INSERT INTO department (name) VALUES ('Executive Management');

INSERT INTO role (title, salary, department_id) VALUES ('Chief Executive Officer', 500000.00, 4);
INSERT INTO role (title, salary, department_id) VALUES ('Vice President', 350000.00, 4);
INSERT INTO role (title, salary, department_id) VALUES ('Chief Financial Officer', 250000.00, 4);

INSERT INTO role (title, salary, department_id) VALUES ('Lead Software Developer', 150000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Senior Software Developer', 120000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Junior Software Developer', 75000.00, 3);

INSERT INTO role (title, salary, department_id) VALUES ('Lead Accountant', 130000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Senior Accountant', 100000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Junior Accountant', 65000.00, 2);

INSERT INTO role (title, salary, department_id) VALUES ('Law Office Manager', 190000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ('General Counsel', 140000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Paralegal', 80000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Bob', 'Dumain', 10, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jeri', 'Donovan', 11, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Judy', 'Jones', 12, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Bill', 'Gates', 1, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Penny', 'Pincher', 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Ben', 'Matlock', 7, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Steve', 'Jobs', 2, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Steve', 'Balmer', 3, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Mark', 'Zuckerberg', 3, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Traci', 'Skinflint', 5, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Billy', 'Cheapskate', 6, 10);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Thrifty', 'McSpendless', 6, 10);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Johnnie', 'Cochran', 8, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Gloria', 'Allred', 9, 13);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Janet', 'Reno', 9, 13);