/*
  Warnings:

  - You are about to drop the column `image` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "image",
ADD COLUMN     "avatar" TEXT DEFAULT 'https://i.pinimg.com/originals/82/4d/b0/824db05450ed6305253092e8aedb329f.jpg';
