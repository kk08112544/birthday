BEGIN TRY

BEGIN TRAN;

-- Drop dependent constraint before dropping column
ALTER TABLE [dbo].[Festival] DROP CONSTRAINT [Festival_isEditEndDate_df];

-- AlterTable
ALTER TABLE [dbo].[Festival] DROP COLUMN [isEditEndDate];
ALTER TABLE [dbo].[Festival] ADD [isEditStartEndDate] BIT NOT NULL CONSTRAINT [Festival_isEditStartEndDate_df] DEFAULT 1,
[updatedBy] INT;

-- AlterTable
ALTER TABLE [dbo].[Unpolite] ADD [createdBy] INT NOT NULL,
[deletedBy] INT,
[updatedBy] INT;

-- DropTable
DROP TABLE [dbo].[Ignore];

-- AddForeignKey
ALTER TABLE [dbo].[Festival] ADD CONSTRAINT [Festival_updatedBy_fkey] FOREIGN KEY ([updatedBy]) REFERENCES [dbo].[User]([uId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Unpolite] ADD CONSTRAINT [Unpolite_createdBy_fkey] FOREIGN KEY ([createdBy]) REFERENCES [dbo].[User]([uId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Unpolite] ADD CONSTRAINT [Unpolite_updatedBy_fkey] FOREIGN KEY ([updatedBy]) REFERENCES [dbo].[User]([uId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Unpolite] ADD CONSTRAINT [Unpolite_deletedBy_fkey] FOREIGN KEY ([deletedBy]) REFERENCES [dbo].[User]([uId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH