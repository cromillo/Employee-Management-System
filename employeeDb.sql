DROP DATABASE IF EXISTS employeeDb;

CREATE DATABASE employeeDb;

USE employeeDb;

CREATE TABLE department(
  id INT NOT NULL,
  dept_name VARCHAR (30),
  PRIMARY KEY (id)
);

CREATE TABLE employee_role(
  id INT NOT NULL auto_increment,
  title VARCHAR (30),
  salary DECIMAL,
  department_id INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT auto_increment,
  first_name VARCHAR (30),
  last_name VARCHAR (30),
  role_id INTEGER,
  manager_id INTEGER,
  PRIMARY KEY (id)
);



INSERT INTO department (id, dept_name)
VALUES 
(1,"Sales"),
(2,"Engineering"),
(3,"Finance"),
(4,"Legal");


INSERT INTO employee_role (title, salary, department_id)
VALUES 
("Sales Lead", 100000,1),
("Salesperson", 80000,1),
("Lead Engineer", 150000,2),
("Software Engineer", 120000,2),
("Account Manager", 160000,3),
("Accountant", 125000,3),
("Legal Team Lead", 250000,4),
("Lawyer",190000,4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("John", "Doe",1, null),
("Mike", "Chan",2, 1),
("Ashley", "Rodriguez",3, null),
("Kevin", "Tupik",4, 3),
("Kunal", "Singh",5, null),
("Malia", "Brown",6,5),
("Sarah", "Lourd",7, null),
("Tom", "Allen",8,7);


