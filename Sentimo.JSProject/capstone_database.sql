 CREATE DATABASE inventory_sales_mgmt;

 CREATE TABLE employee_info(
    id serial PRIMARY KEY NOT NULL,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    user_gender VARCHAR(10) NOT NULL,
    user_role VARCHAR(10) NOT NULL,
    user_mobile VARCHAR(10) NOT NULL,
    user_addr VARCHAR(200) NOT NULL,
    user_email VARCHAR(60) NOT NULL,
    user_pass VARCHAR(10) NOT NULL
 );

CREATE TABLE category(
    id serial PRIMARY KEY NOT NULL,
    name VARCHAR(25) NOT NULL,
    description VARCHAR(100) NOT NULL
);

CREATE TABLE product(
    id serial PRIMARY KEY NOT NULL,
    category_id INTEGER REFERENCES category(id),
    name VARCHAR(20) NOT NULL,
    qty INT(10) NOT NULL,
    unitprice FLOAT(10) NOT NULL
);


CREATE TABLE customer_info(
    id serial PRIMARY KEY NOT NULL,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    email VARCHAR(60) NOT NULL
);

CREATE TABLE order(
    id serial PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES employee_info(id),
    customer_id INTEGER REFERENCES customer_info(id),
    subtotal FLOAT(10) NOT NULL,
    vat FLOAT(10) NOT NULL,
    discount FLOAT(10),
    total FLOAT(10) NOT NULL,
    datetime TIMESTAMP NOT NULL,
    status VARCHAR(10) NOT NULL
);

CREATE TABLE order_products(
    id serial PRIMARY KEY NOT NULL,
    order_id INTEGER REFERENCES order(id),
    product_id INTEGER REFERENCES product(id),
    qty INT(10) NOT NULL,
    unitprice FLOAT(10) NOT NULL,
    total FLOAT(10) NOT NULL
    )