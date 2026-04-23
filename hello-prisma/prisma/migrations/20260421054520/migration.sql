BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Sender] (
    [sId] INT NOT NULL IDENTITY(1,1),
    [fullName] NVARCHAR(1000) NOT NULL,
    [position] NVARCHAR(1000) NOT NULL,
    [department] NVARCHAR(1000) NOT NULL,
    [cardId] INT NOT NULL,
    [wishId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Sender_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Sender_pkey] PRIMARY KEY CLUSTERED ([sId])
);

-- CreateTable
CREATE TABLE [dbo].[Wisher] (
    [wId] INT NOT NULL IDENTITY(1,1),
    [wishWord] NVARCHAR(1000) NOT NULL,
    [festivalId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Wisher_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [deletedAt] DATETIME2,
    CONSTRAINT [Wisher_pkey] PRIMARY KEY CLUSTERED ([wId])
);

-- CreateTable
CREATE TABLE [dbo].[Card] (
    [cId] INT NOT NULL IDENTITY(1,1),
    [imageCard] NVARCHAR(1000) NOT NULL,
    [festivalId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Card_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deletedAt] DATETIME2,
    CONSTRAINT [Card_pkey] PRIMARY KEY CLUSTERED ([cId])
);

-- CreateTable
CREATE TABLE [dbo].[Festival] (
    [fId] INT NOT NULL IDENTITY(1,1),
    [festivalName] NVARCHAR(1000) NOT NULL,
    [image] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Festival_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deletedAt] DATETIME2,
    CONSTRAINT [Festival_pkey] PRIMARY KEY CLUSTERED ([fId])
);

-- CreateTable
CREATE TABLE [dbo].[Unpolite] (
    [upId] INT NOT NULL IDENTITY(1,1),
    [word] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Unpolite_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [deletedAt] DATETIME2,
    CONSTRAINT [Unpolite_pkey] PRIMARY KEY CLUSTERED ([upId])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [uId] INT NOT NULL IDENTITY(1,1),
    [firstName] NVARCHAR(1000) NOT NULL,
    [userName] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([uId]),
    CONSTRAINT [User_userName_key] UNIQUE NONCLUSTERED ([userName])
);

-- AddForeignKey
ALTER TABLE [dbo].[Sender] ADD CONSTRAINT [Sender_cardId_fkey] FOREIGN KEY ([cardId]) REFERENCES [dbo].[Card]([cId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Sender] ADD CONSTRAINT [Sender_wishId_fkey] FOREIGN KEY ([wishId]) REFERENCES [dbo].[Wisher]([wId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Wisher] ADD CONSTRAINT [Wisher_festivalId_fkey] FOREIGN KEY ([festivalId]) REFERENCES [dbo].[Festival]([fId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Card] ADD CONSTRAINT [Card_festivalId_fkey] FOREIGN KEY ([festivalId]) REFERENCES [dbo].[Festival]([fId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
