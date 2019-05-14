-- Create the Bamazon database
CREATE DATABASE Bamazon;
-- Select Bamazon as the DB to use
USE Bamazon;
-- Create products table
CREATE TABLE products (
-- Unique id for each product
item_id INT(5) NOT NULL,
-- The product's name
product_name VARCHAR(25) NOT NULL,
-- The department the product is found in
department_name VARCHAR(25) NOT NULL,
-- Cost to the customer
price INT(6) NOT NULL,
-- How much of the product is available in stores
stock_quantity INT(6) NOT NULL,
-- Make item_id the primary key
PRIMARY KEY (item_id)
);

-- Populate the database
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "dish drainer", "housewares", 12, 36);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "wastebasket", "housewares", 15, 30);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "The Secret History", "books", 22, 12);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "Moll Flanders", "books", 18, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "Roget's Thesaurus", "books", 8, 7);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "Elements of Style", "books", 8, 12);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "soccer ball", "sports equipment", 8, 12);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "tennis racket", "sports equipment", 40, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "badminton set", "sports equipment", 32, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "soccer ball", "sports equipment", 8, 7);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (11, "amethyst ring", "jewelry", 65, 4);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (12, "topaz necklace", "jewelry", 72, 3);










