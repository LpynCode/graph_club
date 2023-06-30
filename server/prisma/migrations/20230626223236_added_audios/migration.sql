-- CreateTable
CREATE TABLE "added_audios" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "audioId" INTEGER NOT NULL,

    CONSTRAINT "added_audios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "added_audios" ADD CONSTRAINT "added_audios_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "added_audios" ADD CONSTRAINT "added_audios_audioId_fkey" FOREIGN KEY ("audioId") REFERENCES "audios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
