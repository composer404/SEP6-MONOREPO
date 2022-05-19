/*
  Warnings:

  - You are about to drop the column `topListId` on the `Movie` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_topListId_fkey";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "topListId";

-- CreateTable
CREATE TABLE "_MovieToTopList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToTopList_AB_unique" ON "_MovieToTopList"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToTopList_B_index" ON "_MovieToTopList"("B");

-- AddForeignKey
ALTER TABLE "_MovieToTopList" ADD CONSTRAINT "_MovieToTopList_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToTopList" ADD CONSTRAINT "_MovieToTopList_B_fkey" FOREIGN KEY ("B") REFERENCES "TopList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
