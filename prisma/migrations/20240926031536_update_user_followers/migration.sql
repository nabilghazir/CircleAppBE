-- AlterTable
ALTER TABLE "user" ALTER COLUMN "following" DROP NOT NULL,
ALTER COLUMN "following" SET DEFAULT 0,
ALTER COLUMN "folowers" DROP NOT NULL,
ALTER COLUMN "folowers" SET DEFAULT 0;
