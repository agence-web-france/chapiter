/*
  Warnings:

  - A unique constraint covering the columns `[pageId]` on the table `Seo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Seo_pageId_key" ON "Seo"("pageId");
