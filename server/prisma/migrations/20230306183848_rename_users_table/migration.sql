/*
  Warnings:

  - You are about to drop the `UsersListItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UsersListItem";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "displayName" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
