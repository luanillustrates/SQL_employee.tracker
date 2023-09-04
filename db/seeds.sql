INSERT INTO departments (dept_name)
VALUES  ('sales'),
        ('creative'),
        ('legal'),
        ('tech');

SELECT * FROM departments;

INSERT INTO roles (title, salary, department_id)
VALUES  ('salesperson', 65000, 1),
        ('graphic designer', 70000, 2),
        ('graphic lead', 85000, 2),
        ('lawyer', 85000, 3),
        ('developer', 90000, 4),
        ('quality assurance', 88000, 4);

SELECT * FROM roles;

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ('Craig', 'Vino', 5),
        ('Robbie', 'Cheng', 2),
        ('Holly', 'Winters', 3),
        ('Sasha', 'Fierce', 4),
        ('Carter', 'Cortel', 1);

SELECT * FROM employee;