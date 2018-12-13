DROP DATABASE IF EXISTS productdatabase;
CREATE DATABASE productdatabase;

CREATE TABLE product (
    productId int not null primary key,
    name varchar(15),
    model int,
    price int,
    type varchar(15)
);

INSERT INTO product (productId, name, model, price, type)
VALUES (1, 'Mouse', 1.4, 50, 'Blacktail');

INSERT INTO product (productId, name, model, price, type)
VALUES (2, 'Cat', 2.9, 120, 'Chaser');

DROP USER IF EXISTS 'zeke'@'localhost';
CREATE USER IF NOT EXISTS 'zeke'@'localhost' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON persondatabase.* to 'zeke'@'localhost';
