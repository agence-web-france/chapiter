/*
  Warnings:

  - You are about to drop the `SEO` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SEO";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Seo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pageId" INTEGER NOT NULL,
    CONSTRAINT "Seo_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
