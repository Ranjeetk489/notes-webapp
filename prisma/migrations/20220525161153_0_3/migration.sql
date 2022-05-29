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
    "title" TEXT,
    "color" TEXT,
    "content" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "tag" TEXT,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "priority" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Archived" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "color" TEXT,
    "content" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "tag" TEXT,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "priority" TEXT,
    "userId" TEXT,

    CONSTRAINT "Archived_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trash" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "color" TEXT,
    "content" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "tag" TEXT,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "priority" TEXT,
    "userId" TEXT,

    CONSTRAINT "Trash_pkey" PRIMARY KEY ("id")
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

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Archived" ADD CONSTRAINT "Archived_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trash" ADD CONSTRAINT "Trash_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
