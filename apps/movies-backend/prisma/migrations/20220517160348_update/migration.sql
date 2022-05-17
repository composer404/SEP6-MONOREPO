/*
  Warnings:

  - A unique constraint covering the columns `[apiId]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Movie_apiId_key" ON "Movie"("apiId");
