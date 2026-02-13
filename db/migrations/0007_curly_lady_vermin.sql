ALTER TABLE "block" RENAME COLUMN "userName" TO "user_name";--> statement-breakpoint
ALTER TABLE "header" RENAME COLUMN "userName" TO "user_name";--> statement-breakpoint
ALTER TABLE "page" RENAME COLUMN "userName" TO "user_name";--> statement-breakpoint
ALTER TABLE "page" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "page" DROP CONSTRAINT "page_userName_unique";--> statement-breakpoint
ALTER TABLE "block" DROP CONSTRAINT "block_userName_page_userName_fk";
--> statement-breakpoint
ALTER TABLE "header" DROP CONSTRAINT "header_userName_page_userName_fk";
--> statement-breakpoint
ALTER TABLE "page" DROP CONSTRAINT "page_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "social" DROP CONSTRAINT "social_user_name_page_userName_fk";
--> statement-breakpoint
ALTER TABLE "block" ADD CONSTRAINT "block_user_name_page_user_name_fk" FOREIGN KEY ("user_name") REFERENCES "public"."page"("user_name") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "header" ADD CONSTRAINT "header_user_name_page_user_name_fk" FOREIGN KEY ("user_name") REFERENCES "public"."page"("user_name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "page" ADD CONSTRAINT "page_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "social" ADD CONSTRAINT "social_user_name_page_user_name_fk" FOREIGN KEY ("user_name") REFERENCES "public"."page"("user_name") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "block_user_name_index" ON "block" USING btree ("user_name");--> statement-breakpoint
CREATE INDEX "header_user_name_idx" ON "header" USING btree ("user_name");--> statement-breakpoint
CREATE INDEX "page_user_id_idx" ON "page" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "social_user_name_idx" ON "social" USING btree ("user_name");--> statement-breakpoint
ALTER TABLE "page" ADD CONSTRAINT "page_user_name_unique" UNIQUE("user_name");