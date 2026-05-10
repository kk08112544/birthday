/*
  Warnings:

  - You are about to drop the column `isActive` on the `Festival` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Festival] DROP COLUMN [isActive];
ALTER TABLE [dbo].[Festival] ADD [isDelete] BIT NOT NULL CONSTRAINT [Festival_isDelete_df] DEFAULT 1,
[isEdit] BIT NOT NULL CONSTRAINT [Festival_isEdit_df] DEFAULT 1,
[isEditEndDate] BIT NOT NULL CONSTRAINT [Festival_isEditEndDate_df] DEFAULT 1;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
