/*
  Warnings:

  - You are about to drop the `AudiosPlaylistModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AudiosPlaylistModel" DROP CONSTRAINT "AudiosPlaylistModel_audioId_fkey";

-- DropForeignKey
ALTER TABLE "AudiosPlaylistModel" DROP CONSTRAINT "AudiosPlaylistModel_playlistId_fkey";

-- DropTable
DROP TABLE "AudiosPlaylistModel";

-- CreateTable
CREATE TABLE "audios_playlist" (
    "id" SERIAL NOT NULL,
    "playlistId" INTEGER NOT NULL,
    "audioId" INTEGER NOT NULL,

    CONSTRAINT "audios_playlist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "audios_playlist" ADD CONSTRAINT "audios_playlist_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "playlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audios_playlist" ADD CONSTRAINT "audios_playlist_audioId_fkey" FOREIGN KEY ("audioId") REFERENCES "audios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
