/*
  Warnings:

  - Added the required column `endDate` to the `Festival` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Festival` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Festival] ADD [endDate] DATETIME2 NOT NULL,
[startDate] DATETIME2 NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
