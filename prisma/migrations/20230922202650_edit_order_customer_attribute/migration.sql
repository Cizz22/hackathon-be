/*
  Warnings:

  - You are about to drop the column `company_name` on the `OrderCustomerDetail` table. All the data in the column will be lost.
  - You are about to drop the column `company_website` on the `OrderCustomerDetail` table. All the data in the column will be lost.
  - Added the required column `organization_name` to the `OrderCustomerDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_website` to the `OrderCustomerDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderCustomerDetail" DROP COLUMN "company_name",
DROP COLUMN "company_website",
ADD COLUMN     "organization_name" TEXT NOT NULL,
ADD COLUMN     "organization_website" TEXT NOT NULL;
