USE bamazon_db;

CREATE TABLE product(
	item_id INT AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(45) NOT NULL,
	department_name VARCHAR(45) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(10) NOT NULL,
	primary key(item_id) 
	);


INSERT INTO product(
product_name,department_name,price,stock_quantity) 
VALUES ("Playstation 4","Electronics",999.99,120), 
("Assasin's Creed","Electronics",64.99,78),
("Playstion 4 controller","Electronics",55.99,46),
("Playstion 4 Motion sensor","Electronics",89.99,30),
("Resident Evil 5","Electronics",49.99,100),
("HDMI Cable","Electronics",14.99,10),
("2 TB External HD","Electronics",119.99,5),
("Playstation 4 Controller Keyboard Adapter","Electronics",20,18)

