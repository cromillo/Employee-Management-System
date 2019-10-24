USE employeeDb;

INSERT INTO department (id, dept_name)
VALUES (1,"Sales")

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Sales Lead", 100000,1)


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan",2, 1)