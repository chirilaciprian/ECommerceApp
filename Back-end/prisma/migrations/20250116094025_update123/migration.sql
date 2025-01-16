/*
  Warnings:

  - You are about to drop the column `whishlistId` on the `WhishlistItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[wishlistId,productId]` on the table `WhishlistItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `wishlistId` to the `WhishlistItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WhishlistItem" DROP CONSTRAINT "WhishlistItem_whishlistId_fkey";

-- DropIndex
DROP INDEX "WhishlistItem_whishlistId_productId_key";

-- AlterTable
ALTER TABLE "WhishlistItem" DROP COLUMN "whishlistId",
ADD COLUMN     "wishlistId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WhishlistItem_wishlistId_productId_key" ON "WhishlistItem"("wishlistId", "productId");

-- AddForeignKey
ALTER TABLE "WhishlistItem" ADD CONSTRAINT "WhishlistItem_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Whishlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
