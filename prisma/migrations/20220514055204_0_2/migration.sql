-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Archived" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Archived_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trash" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Trash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "tagName" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NoteToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ArchivedToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TagToTrash" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_password_userId_key" ON "User"("email", "password", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Note_contentId_key" ON "Note"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "Note_id_contentId_userId_key" ON "Note"("id", "contentId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Archived_contentId_key" ON "Archived"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "Archived_id_userId_contentId_key" ON "Archived"("id", "userId", "contentId");

-- CreateIndex
CREATE UNIQUE INDEX "Trash_contentId_key" ON "Trash"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "Trash_id_userId_contentId_key" ON "Trash"("id", "userId", "contentId");

-- CreateIndex
CREATE UNIQUE INDEX "_NoteToTag_AB_unique" ON "_NoteToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_NoteToTag_B_index" ON "_NoteToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArchivedToTag_AB_unique" ON "_ArchivedToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ArchivedToTag_B_index" ON "_ArchivedToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TagToTrash_AB_unique" ON "_TagToTrash"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToTrash_B_index" ON "_TagToTrash"("B");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Archived" ADD CONSTRAINT "Archived_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trash" ADD CONSTRAINT "Trash_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NoteToTag" ADD CONSTRAINT "_NoteToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NoteToTag" ADD CONSTRAINT "_NoteToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArchivedToTag" ADD CONSTRAINT "_ArchivedToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Archived"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArchivedToTag" ADD CONSTRAINT "_ArchivedToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTrash" ADD CONSTRAINT "_TagToTrash_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTrash" ADD CONSTRAINT "_TagToTrash_B_fkey" FOREIGN KEY ("B") REFERENCES "Trash"("id") ON DELETE CASCADE ON UPDATE CASCADE;
