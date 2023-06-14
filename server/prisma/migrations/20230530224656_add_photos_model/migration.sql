-- CreateTable
CREATE TABLE "photos" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "isAvatar" BOOLEAN NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
