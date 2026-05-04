/*
  Warnings:

  - Made the column `logo` on table `Festival` required. This step will fail if there are existing NULL values in that column.
  - Made the column `webName` on table `Festival` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Festival] ALTER COLUMN [logo] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[Festival] ALTER COLUMN [webName] NVARCHAR(1000) NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Sender] ADD CONSTRAINT [Sender_wishId_fkey] FOREIGN KEY ([wishId]) REFERENCES [dbo].[Wisher]([wId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
