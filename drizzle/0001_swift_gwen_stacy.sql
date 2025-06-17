CREATE TABLE "historyTable" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "historyTable_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"recordId" varchar NOT NULL,
	"content" jsonb,
	"userEmail" varchar,
	"createdAt" varchar
);
--> statement-breakpoint
ALTER TABLE "historyTable" ADD CONSTRAINT "historyTable_userEmail_users_email_fk" FOREIGN KEY ("userEmail") REFERENCES "public"."users"("email") ON DELETE no action ON UPDATE no action;