/*
  Warnings:

  - Added the required column `city` to the `pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pet" ADD COLUMN     "city" TEXT NOT NULL;
