BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Ignore] (
    [igId] INT NOT NULL IDENTITY(1,1),
    [word] NVARCHAR(1000) NOT NULL,
    [createdBy] INT NOT NULL,
    [updatedBy] INT,
    [deletedBy] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Ignore_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deletedAt] DATETIME2,
    CONSTRAINT [Ignore_pkey] PRIMARY KEY CLUSTERED ([igId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Ignore] ADD CONSTRAINT [Ignore_createdBy_fkey] FOREIGN KEY ([createdBy]) REFERENCES [dbo].[User]([uId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Ignore] ADD CONSTRAINT [Ignore_updatedBy_fkey] FOREIGN KEY ([updatedBy]) REFERENCES [dbo].[User]([uId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Ignore] ADD CONSTRAINT [Ignore_deletedBy_fkey] FOREIGN KEY ([deletedBy]) REFERENCES [dbo].[User]([uId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
