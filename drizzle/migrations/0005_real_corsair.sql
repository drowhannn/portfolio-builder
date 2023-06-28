ALTER TABLE "blog" DROP CONSTRAINT "blog_blog_category_id_blog_category_id_fk";

ALTER TABLE "work" DROP CONSTRAINT "work_category_id_work_category_id_fk";

DO $$ BEGIN
 ALTER TABLE "blog" ADD CONSTRAINT "blog_blog_category_id_blog_category_id_fk" FOREIGN KEY ("blog_category_id") REFERENCES "blog_category"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "work" ADD CONSTRAINT "work_category_id_work_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "work_category"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
