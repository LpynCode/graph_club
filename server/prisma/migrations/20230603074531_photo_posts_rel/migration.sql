/*
  Warnings:

  - You are about to drop the column `filePath` on the `posts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[photoId]` on the table `posts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "filePath",
ADD COLUMN     "photoId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "posts_photoId_key" ON "posts"("photoId");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "photos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
