/*
  Warnings:

  - You are about to drop the column `addresss_complement` on the `organization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "organization" DROP COLUMN "addresss_complement",
ADD COLUMN     "address_complement" TEXT;
