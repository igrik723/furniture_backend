/*
  Warnings:

  - You are about to drop the column `saleId` on the `Agreement` table. All the data in the column will be lost.
  - Added the required column `furnitureId` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Made the column `agreementId` on table `Sale` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Agreement" DROP CONSTRAINT "Agreement_saleId_fkey";

-- DropForeignKey
ALTER TABLE "FurnitureModel" DROP CONSTRAINT "FurnitureModel_saleId_fkey";

-- DropIndex
DROP INDEX "Agreement_saleId_key";

-- DropIndex
DROP INDEX "Sale_agreementId_key";

-- AlterTable
ALTER TABLE "Agreement" DROP COLUMN "saleId";

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "furnitureId" INTEGER NOT NULL,
ALTER COLUMN "agreementId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_agreementId_fkey" FOREIGN KEY ("agreementId") REFERENCES "Agreement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_furnitureId_fkey" FOREIGN KEY ("furnitureId") REFERENCES "FurnitureModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
