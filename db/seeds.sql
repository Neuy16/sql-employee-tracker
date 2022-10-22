INSERT INTO departments (name)
    VALUES 
    ('Yard'),
    ('Cabinets'),
    ('Paint'),
    ('Hardware'),
    ('Store');
    

 INSERT INTO roles (title, salary, departmentsID)
    VALUES
    ('Forklifter', 32000, 1),
    ('Kitchen Designer', 41000, 2),
    ('Mixer', 23000, 3),
    ('Stocker', 20000, 4),
    ('Manager', 50000, 1),
    ('Manager', 64000, 2),
    ('Manager', 47000, 3),
    ('Manager', 43000, 4),
    ('General Manager', 600000, 5);
    
INSERT INTO employees (first_name, last_name, managersID, rolesID)
    VALUES
    ('Andrew', 'Neuy', 3, 1),
    ('Randall', 'Badatchess', 2, 4),
    ('Bill', 'Gates', 4, 5),
    ('lil', 'Drew', NULL, 9);
    


        
