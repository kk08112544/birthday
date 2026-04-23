/*
  Warnings:

  - You are about to drop the column `fullName` on the `Sender` table. All the data in the column will be lost.
  - Added the required column `fullname` to the `Sender` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Sender] DROP COLUMN [fullName];
ALTER TABLE [dbo].[Sender] ADD [fullname] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
