BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Sender] DROP CONSTRAINT [Sender_festivalId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Sender] DROP CONSTRAINT [Sender_wishId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Festival] ADD [logo] NVARCHAR(1000),
[webName] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
