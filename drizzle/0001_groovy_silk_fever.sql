CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`brand` varchar(128) NOT NULL,
	`category` enum('Panels','Inverters','Batteries','CCTV','Accessories') NOT NULL,
	`price` int NOT NULL,
	`description` text,
	`image` varchar(512),
	`specs` text,
	`inStock` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
