/*
  Warnings:

  - Added the required column `createdBy` to the `Festival` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Festival] ADD [createdBy] INT NOT NULL,
[deletedBy] INT;

-- AddForeignKey
ALTER TABLE [dbo].[Festival] ADD CONSTRAINT [Festival_createdBy_fkey] FOREIGN KEY ([createdBy]) REFERENCES [dbo].[User]([uId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Festival] ADD CONSTRAINT [Festival_deletedBy_fkey] FOREIGN KEY ([deletedBy]) REFERENCES [dbo].[User]([uId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
