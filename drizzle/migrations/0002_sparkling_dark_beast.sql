CREATE TABLE IF NOT EXISTS "blog" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"image" varchar(256) NOT NULL,
	"blog_category_id" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS "blog_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS "blog_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"comment" text NOT NULL,
	"blog_id" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS "blog_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"position" varchar(256) NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"image" varchar(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS "work" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"image" varchar(256) NOT NULL,
	"category_id" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS "work_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "blog" ADD CONSTRAINT "blog_blog_category_id_blog_category_id_fk" FOREIGN KEY ("blog_category_id") REFERENCES "blog_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_comments" ADD CONSTRAINT "blog_comments_blog_id_blog_id_fk" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "work" ADD CONSTRAINT "work_category_id_work_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "work_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
