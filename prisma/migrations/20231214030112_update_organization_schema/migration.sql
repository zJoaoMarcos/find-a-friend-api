/*
  Warnings:

  - You are about to drop the column `adress` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `adress_number` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `adresss_complement` on the `organization` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `organization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_number` to the `organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organization" DROP COLUMN "adress",
DROP COLUMN "adress_number",
DROP COLUMN "adresss_complement",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "address_number" TEXT NOT NULL,
ADD COLUMN     "addresss_complement" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "organization_email_key" ON "organization"("email");
