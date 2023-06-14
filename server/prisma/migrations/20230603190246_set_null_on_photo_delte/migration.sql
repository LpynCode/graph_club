-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_photoId_fkey";

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "photos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
