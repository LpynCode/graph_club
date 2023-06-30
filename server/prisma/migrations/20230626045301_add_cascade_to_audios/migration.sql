-- DropForeignKey
ALTER TABLE "audios" DROP CONSTRAINT "audios_playlistId_fkey";

-- AddForeignKey
ALTER TABLE "audios" ADD CONSTRAINT "audios_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "playlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
