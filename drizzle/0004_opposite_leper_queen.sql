ALTER TABLE "historyTable" ALTER COLUMN "recordId" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "historyTable" ALTER COLUMN "userEmail" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "historyTable" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "historyTable" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "historyTable" ALTER COLUMN "aiAgentType" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "historyTable" ALTER COLUMN "metaData" SET DATA TYPE text;