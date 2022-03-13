/*
  Warnings:

  - Added the required column `status` to the `Component` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Component" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL,
    CONSTRAINT "Component_id_fkey" FOREIGN KEY ("id") REFERENCES "Component" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Component" ("description", "id", "name") SELECT "description", "id", "name" FROM "Component";
DROP TABLE "Component";
ALTER TABLE "new_Component" RENAME TO "Component";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
