REPLACE INTO department (name)
VALUES 
    ( "Production"),
    ( "Sales"),
    ( "Research and Developement"),
    ( "Accounting");


REPLACE INTO role (id, title, salary, department_id)
VALUES
    (1, "Intern", 100, 1),
    (2, "Engineer", 50000, 3),
    (3, "Salesperson", 100000, 2),
    (4, "Accountant",50000, 4);


REPLACE INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
  (1, "Jimbo", "Kern", 1, NULL), 
  (2, "Sam", "Neil", 4, 1),
  (3, "Colista", "Flockhart", 2, 1);

    