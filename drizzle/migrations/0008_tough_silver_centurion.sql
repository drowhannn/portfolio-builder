CREATE TABLE IF NOT EXISTS "blogs_to_blog_tags" (
	"blog_id" integer NOT NULL,
	"blog_tag_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "blogs_to_blog_tags" ADD CONSTRAINT "blogs_to_blog_tags_blog_id_blog_tag_id" PRIMARY KEY("blog_id","blog_tag_id");

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
