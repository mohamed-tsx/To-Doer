/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_categoryId_fkey";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "categoryId",
DROP COLUMN "priority",
DROP COLUMN "status";

-- DropTable
DROP TABLE "Category";

-- DropEnum
DROP TYPE "Priority";

-- DropEnum
DROP TYPE "Status";
