CREATE TABLE `posts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`content` text NOT NULL,
	`image_base64` mediumtext,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
