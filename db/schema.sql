DROP DATABASE IF EXISTS store_db;
CREATE DATABASE store_db;

USE store_db;

CREATE TABLE departments (
  departmentsID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  rolesID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary INT,
  departmentsID INT,
  FOREIGN KEY (departmentsID) REFERENCES departments(departmentsID)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  employeesID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  managersID VARCHAR(30),
  rolesID INT,
  FOREIGN KEY (rolesID) REFERENCES roles(rolesID)
  ON DELETE SET NULL
);