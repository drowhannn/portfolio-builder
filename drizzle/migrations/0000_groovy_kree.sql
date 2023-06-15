CREATE TABLE IF NOT EXISTS "about" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"position" varchar(256),
	"description" text,
	"cv" varchar(256),
	"contact_email" varchar(256)
);

CREATE TABLE IF NOT EXISTS "experience_area" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"description" text
);

CREATE TABLE IF NOT EXISTS "service" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"description" text,
	"icon" varchar(256)
);
