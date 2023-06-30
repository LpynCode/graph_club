/*
  Warnings:

  - You are about to drop the column `playlistId` on the `audios` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "audios" DROP CONSTRAINT "audios_playlistId_fkey";

-- AlterTable
ALTER TABLE "audios" DROP COLUMN "playlistId";

-- CreateTable
CREATE TABLE "AudiosPlaylistModel" (
    "id" SERIAL NOT NULL,
    "playlistId" INTEGER NOT NULL,
    "audioId" INTEGER NOT NULL,

    CONSTRAINT "AudiosPlaylistModel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AudiosPlaylistModel" ADD CONSTRAINT "AudiosPlaylistModel_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "playlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudiosPlaylistModel" ADD CONSTRAINT "AudiosPlaylistModel_audioId_fkey" FOREIGN KEY ("audioId") REFERENCES "audios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
