/*
  Warnings:

  - You are about to drop the `Pet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Pet";

-- CreateTable
CREATE TABLE "pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "level_of_independence" INTEGER NOT NULL,
    "photos" TEXT[],
    "environment" TEXT NOT NULL,
    "requirements_for_adoption" TEXT[],
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "responsible_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cell_number" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "adress_number" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "adresss_complement" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
