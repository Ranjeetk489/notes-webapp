/*
  Warnings:

  - You are about to drop the `ArchivedTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NoteTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrashTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArchivedToArchivedTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NoteToNoteTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TrashToTrashTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ArchivedToArchivedTag" DROP CONSTRAINT "_ArchivedToArchivedTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArchivedToArchivedTag" DROP CONSTRAINT "_ArchivedToArchivedTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_NoteToNoteTag" DROP CONSTRAINT "_NoteToNoteTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_NoteToNoteTag" DROP CONSTRAINT "_NoteToNoteTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_TrashToTrashTag" DROP CONSTRAINT "_TrashToTrashTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_TrashToTrashTag" DROP CONSTRAINT "_TrashToTrashTag_B_fkey";

-- AlterTable
ALTER TABLE "Archived" ADD COLUMN     "tag" TEXT;

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "tag" TEXT;

-- AlterTable
ALTER TABLE "Trash" ADD COLUMN     "tag" TEXT;

-- DropTable
DROP TABLE "ArchivedTag";

-- DropTable
DROP TABLE "NoteTag";

-- DropTable
DROP TABLE "TrashTag";

-- DropTable
DROP TABLE "_ArchivedToArchivedTag";

-- DropTable
DROP TABLE "_NoteToNoteTag";

-- DropTable
DROP TABLE "_TrashToTrashTag";
