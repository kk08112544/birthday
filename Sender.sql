/*
 Navicat Premium Dump SQL

 Source Server         : birthfestival
 Source Server Type    : SQL Server
 Source Server Version : 17001000 (17.00.1000)
 Source Host           : Localhost:1433
 Source Catalog        : birthfestival
 Source Schema         : dbo

 Target Server Type    : SQL Server
 Target Server Version : 17001000 (17.00.1000)
 File Encoding         : 65001

 Date: 20/05/2026 14:41:18
*/


-- ----------------------------
-- Table structure for Sender
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[Sender]') AND type IN ('U'))
	DROP TABLE [dbo].[Sender]
GO

CREATE TABLE [dbo].[Sender] (
  [sId] int  IDENTITY(1,1) NOT NULL,
  [position] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [department] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [cardId] int  NOT NULL,
  [wishId] int  NOT NULL,
  [createdAt] datetime2(7) DEFAULT getdate() NOT NULL,
  [festivalId] int  NOT NULL,
  [fullname] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL
)
GO

ALTER TABLE [dbo].[Sender] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of Sender
-- ----------------------------
SET IDENTITY_INSERT [dbo].[Sender] ON
GO

SET IDENTITY_INSERT [dbo].[Sender] OFF
GO


-- ----------------------------
-- Auto increment value for Sender
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[Sender]', RESEED, 1)
GO


-- ----------------------------
-- Primary Key structure for table Sender
-- ----------------------------
ALTER TABLE [dbo].[Sender] ADD CONSTRAINT [Sender_pkey] PRIMARY KEY CLUSTERED ([sId])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Foreign Keys structure for table Sender
-- ----------------------------
ALTER TABLE [dbo].[Sender] ADD CONSTRAINT [Sender_cardId_fkey] FOREIGN KEY ([cardId]) REFERENCES [dbo].[Card] ([cId]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

ALTER TABLE [dbo].[Sender] ADD CONSTRAINT [Sender_wishId_fkey] FOREIGN KEY ([wishId]) REFERENCES [dbo].[Wisher] ([wId]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

ALTER TABLE [dbo].[Sender] ADD CONSTRAINT [Sender_festivalId_fkey] FOREIGN KEY ([festivalId]) REFERENCES [dbo].[Festival] ([fId]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

