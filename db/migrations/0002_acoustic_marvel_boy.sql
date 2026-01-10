CREATE TABLE "header" (
	"userName" text PRIMARY KEY NOT NULL,
	"name" text DEFAULT '@username' NOT NULL,
	"bio" text,
	"picURL" text DEFAULT 'https://github.com/maxleiter.png'
);
--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "primary_text_color" text;--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "primary_background" text;--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "desktop_background_color" text;--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "profile_picture_shadow" integer;--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "profile_picture_border" integer;--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "social_icon_size" integer;--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "card_color" text;--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "card_text_color" text;--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "card_corner" integer;--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "card_border" integer;--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "card_border_color" text;--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "card_shadow" integer;--> statement-breakpoint
ALTER TABLE "page" ADD COLUMN "card_spacing" integer;--> statement-breakpoint
ALTER TABLE "header" ADD CONSTRAINT "header_userName_page_userName_fk" FOREIGN KEY ("userName") REFERENCES "public"."page"("userName") ON DELETE no action ON UPDATE no action;