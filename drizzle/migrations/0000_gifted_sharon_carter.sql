CREATE TABLE IF NOT EXISTS "about" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"position" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"contact_email" varchar(256) NOT NULL
);

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

CREATE TABLE IF NOT EXISTS "blog_comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"comment" text NOT NULL,
	"blog_id" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS "blog_tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS "blogs_to_blog_tags" (
	"blog_id" integer NOT NULL,
	"blog_tag_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "blogs_to_blog_tags" ADD CONSTRAINT "blogs_to_blog_tags_blog_id_blog_tag_id" PRIMARY KEY("blog_id","blog_tag_id");

CREATE TABLE IF NOT EXISTS "experience_area" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "service" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"icon" varchar(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS "testimonial" (
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
 ALTER TABLE "blog_comment" ADD CONSTRAINT "blog_comment_blog_id_blog_id_fk" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blogs_to_blog_tags" ADD CONSTRAINT "blogs_to_blog_tags_blog_id_blog_id_fk" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blogs_to_blog_tags" ADD CONSTRAINT "blogs_to_blog_tags_blog_tag_id_blog_tag_id_fk" FOREIGN KEY ("blog_tag_id") REFERENCES "blog_tag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "work" ADD CONSTRAINT "work_category_id_work_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "work_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
