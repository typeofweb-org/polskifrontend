/*
  Warnings:

  - Added the required column `email` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "email" TEXT NOT NULL;
