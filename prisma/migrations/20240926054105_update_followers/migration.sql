/*
  Warnings:

  - You are about to drop the column `folowers` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "folowers",
ADD COLUMN     "followers" INTEGER DEFAULT 0;
