/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArchivedToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NoteToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TagToTrash` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ArchivedToTag" DROP CONSTRAINT "_ArchivedToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArchivedToTag" DROP CONSTRAINT "_ArchivedToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_NoteToTag" DROP CONSTRAINT "_NoteToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_NoteToTag" DROP CONSTRAINT "_NoteToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_TagToTrash" DROP CONSTRAINT "_TagToTrash_A_fkey";

-- DropForeignKey
ALTER TABLE "_TagToTrash" DROP CONSTRAINT "_TagToTrash_B_fkey";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_ArchivedToTag";

-- DropTable
DROP TABLE "_NoteToTag";

-- DropTable
DROP TABLE "_TagToTrash";

-- CreateTable
CREATE TABLE "NoteTag" (
    "id" SERIAL NOT NULL,
    "tagName" TEXT NOT NULL,

    CONSTRAINT "NoteTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrashTag" (
    "id" SERIAL NOT NULL,
    "tagName" TEXT NOT NULL,

    CONSTRAINT "TrashTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchivedTag" (
    "id" SERIAL NOT NULL,
    "tagName" TEXT NOT NULL,

    CONSTRAINT "ArchivedTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NoteToNoteTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ArchivedToArchivedTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TrashToTrashTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "NoteTag_tagName_key" ON "NoteTag"("tagName");

-- CreateIndex
CREATE UNIQUE INDEX "TrashTag_tagName_key" ON "TrashTag"("tagName");

-- CreateIndex
CREATE UNIQUE INDEX "ArchivedTag_tagName_key" ON "ArchivedTag"("tagName");

-- CreateIndex
CREATE UNIQUE INDEX "_NoteToNoteTag_AB_unique" ON "_NoteToNoteTag"("A", "B");

-- CreateIndex
CREATE INDEX "_NoteToNoteTag_B_index" ON "_NoteToNoteTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArchivedToArchivedTag_AB_unique" ON "_ArchivedToArchivedTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ArchivedToArchivedTag_B_index" ON "_ArchivedToArchivedTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TrashToTrashTag_AB_unique" ON "_TrashToTrashTag"("A", "B");

-- CreateIndex
CREATE INDEX "_TrashToTrashTag_B_index" ON "_TrashToTrashTag"("B");

-- AddForeignKey
ALTER TABLE "_NoteToNoteTag" ADD CONSTRAINT "_NoteToNoteTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NoteToNoteTag" ADD CONSTRAINT "_NoteToNoteTag_B_fkey" FOREIGN KEY ("B") REFERENCES "NoteTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArchivedToArchivedTag" ADD CONSTRAINT "_ArchivedToArchivedTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Archived"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArchivedToArchivedTag" ADD CONSTRAINT "_ArchivedToArchivedTag_B_fkey" FOREIGN KEY ("B") REFERENCES "ArchivedTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrashToTrashTag" ADD CONSTRAINT "_TrashToTrashTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Trash"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrashToTrashTag" ADD CONSTRAINT "_TrashToTrashTag_B_fkey" FOREIGN KEY ("B") REFERENCES "TrashTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
