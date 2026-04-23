/*
  Warnings:

  - Added the required column `festivalId` to the `Sender` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Sender] ADD [festivalId] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Sender] ADD CONSTRAINT [Sender_festivalId_fkey] FOREIGN KEY ([festivalId]) REFERENCES [dbo].[Festival]([fId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
