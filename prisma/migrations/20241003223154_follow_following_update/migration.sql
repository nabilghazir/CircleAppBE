/*
  Warnings:

  - You are about to drop the column `followers` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `following` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "followers",
DROP COLUMN "following";
