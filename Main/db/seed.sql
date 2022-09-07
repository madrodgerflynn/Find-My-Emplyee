REPLACE INTO department (id, name)
VALUES 
    (6, "Advertising"),
    (7, "Sales"),
    (8, "Research and Developement"),
    (9,"Accounting");


REPLACE INTO role (id, title, salary, department_id)
VALUES
    (1, "Manager", 100000, 11),
    (2, "Engineer", 50000, 21),
    (3, "Salesperson", 100000, 31),
    (4, "Receptionist",50000, 41);


REPLACE INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
  (1, "Jimbo", "Kern", 8, 9) 