CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "block" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userName" text NOT NULL,
	"title" text,
	"url" text,
	"img_url" text,
	"type" text,
	"order" integer NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "header" (
	"userName" text PRIMARY KEY NOT NULL,
	"name" text DEFAULT '@username',
	"bio" text,
	"picURL" text
);
--> statement-breakpoint
CREATE TABLE "page" (
	"userName" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"primary_text_color" text,
	"primary_background" text,
	"desktop_background_color" text,
	"profile_picture_shadow" integer,
	"profile_picture_border" integer,
	"social_icon_size" integer,
	"card_color" text,
	"card_text_color" text,
	"card_corner" integer,
	"card_border" integer,
	"card_border_color" text,
	"card_shadow" integer,
	"card_spacing" integer,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "page_userName_unique" UNIQUE("userName")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "social" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userName" text NOT NULL,
	"type" text NOT NULL,
	"url" text,
	"order" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"userName" text,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "block" ADD CONSTRAINT "block_userName_page_userName_fk" FOREIGN KEY ("userName") REFERENCES "public"."page"("userName") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "header" ADD CONSTRAINT "header_userName_page_userName_fk" FOREIGN KEY ("userName") REFERENCES "public"."page"("userName") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "page" ADD CONSTRAINT "page_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "social" ADD CONSTRAINT "social_userName_page_userName_fk" FOREIGN KEY ("userName") REFERENCES "public"."page"("userName") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "block_user_name_index" ON "block" USING btree ("userName");--> statement-breakpoint
CREATE INDEX "header_user_name_idx" ON "header" USING btree ("userName");--> statement-breakpoint
CREATE INDEX "page_user_id_idx" ON "page" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "social_user_name_idx" ON "social" USING btree ("userName");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");