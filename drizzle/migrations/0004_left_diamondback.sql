ALTER TABLE "blog_comments" RENAME TO "blog_comment";
ALTER TABLE "blog_tags" RENAME TO "blog_tag";
ALTER TABLE "blog_comment" DROP CONSTRAINT "blog_comments_blog_id_blog_id_fk";

DO $$ BEGIN
 ALTER TABLE "blog_comment" ADD CONSTRAINT "blog_comment_blog_id_blog_id_fk" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
