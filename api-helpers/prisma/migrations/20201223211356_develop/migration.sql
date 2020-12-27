/*
  Warnings:

  - You are about to drop the column `addedById` on the `Blog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_addedById_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "addedById",
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;
