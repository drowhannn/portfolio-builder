ALTER TABLE "work" DROP CONSTRAINT "work_category_id_work_category_id_fk";

DO $$ BEGIN
 ALTER TABLE "work" ADD CONSTRAINT "work_category_id_work_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "work_category"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
