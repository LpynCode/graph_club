-- DropForeignKey
ALTER TABLE "avatars" DROP CONSTRAINT "avatars_photoId_fkey";

-- AddForeignKey
ALTER TABLE "avatars" ADD CONSTRAINT "avatars_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "photos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
