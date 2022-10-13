DROP DATABASE IF EXISTS store_db;
CREATE DATABASE store_db;

USE store_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  [name] VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE [role] (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(2),
  department_id INT NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  manager_id VARCHAR(30),
  role_id INT,
  FOREIGN KEY (role_id)
  REFERENCES [role](id)
  ON DELETE SET NULL,
  PRIMARY KEY (id)
);