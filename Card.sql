/*
 Navicat Premium Dump SQL

 Source Server         : Localhost
 Source Server Type    : SQL Server
 Source Server Version : 17001000 (17.00.1000)
 Source Host           : DESKTOP-FJDU22M\SQLEXPRESS:1433
 Source Catalog        : birthfestival
 Source Schema         : dbo

 Target Server Type    : SQL Server
 Target Server Version : 17001000 (17.00.1000)
 File Encoding         : 65001

 Date: 24/04/2026 14:21:25
*/


-- ----------------------------
-- Table structure for Card
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[Card]') AND type IN ('U'))
	DROP TABLE [dbo].[Card]
GO

CREATE TABLE [dbo].[Card] (
  [cId] int  IDENTITY(1,1) NOT NULL,
  [imageCard] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [festivalId] int  NOT NULL,
  [createdAt] datetime2(7) DEFAULT getdate() NOT NULL,
  [updatedAt] datetime2(7)  NOT NULL,
  [deletedAt] datetime2(7)  NULL
)
GO

ALTER TABLE [dbo].[Card] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of Card
-- ----------------------------
SET IDENTITY_INSERT [dbo].[Card] ON
GO

INSERT INTO [dbo].[Card] ([cId], [imageCard], [festivalId], [createdAt], [updatedAt], [deletedAt]) VALUES (N'8', N'card1.jpg', N'1', N'2026-04-15 14:17:21.0000000', N'2026-04-15 14:17:24.0000000', NULL)
GO

INSERT INTO [dbo].[Card] ([cId], [imageCard], [festivalId], [createdAt], [updatedAt], [deletedAt]) VALUES (N'10', N'Fileupload-1776933046789.jpeg', N'1', N'2026-04-15 14:17:24.0000000', N'2026-04-15 14:17:24.0000000', NULL)
GO

INSERT INTO [dbo].[Card] ([cId], [imageCard], [festivalId], [createdAt], [updatedAt], [deletedAt]) VALUES (N'11', N'Fileupload-1776933338686.jpeg', N'1', N'2026-04-15 14:17:24.0000000', N'2026-04-15 14:17:24.0000000', NULL)
GO

INSERT INTO [dbo].[Card] ([cId], [imageCard], [festivalId], [createdAt], [updatedAt], [deletedAt]) VALUES (N'12', N'Fileupload-1776933389167.jpeg', N'1', N'2026-04-15 14:17:24.0000000', N'2026-04-15 14:17:24.0000000', NULL)
GO

INSERT INTO [dbo].[Card] ([cId], [imageCard], [festivalId], [createdAt], [updatedAt], [deletedAt]) VALUES (N'13', N'Fileupload-1776936742487.jpeg', N'1', N'2026-04-15 14:17:24.0000000', N'2026-04-15 14:17:24.0000000', NULL)
GO

INSERT INTO [dbo].[Card] ([cId], [imageCard], [festivalId], [createdAt], [updatedAt], [deletedAt]) VALUES (N'14', N'Fileupload-1776936812692.jpeg', N'1', N'2026-04-15 14:17:24.0000000', N'2026-04-15 14:17:24.0000000', NULL)
GO

SET IDENTITY_INSERT [dbo].[Card] OFF
GO


-- ----------------------------
-- Auto increment value for Card
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[Card]', RESEED, 14)
GO


-- ----------------------------
-- Primary Key structure for table Card
-- ----------------------------
ALTER TABLE [dbo].[Card] ADD CONSTRAINT [Card_pkey] PRIMARY KEY CLUSTERED ([cId])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Foreign Keys structure for table Card
-- ----------------------------
ALTER TABLE [dbo].[Card] ADD CONSTRAINT [Card_festivalId_fkey] FOREIGN KEY ([festivalId]) REFERENCES [dbo].[Festival] ([fId]) ON DELETE NO ACTION ON UPDATE CASCADE
GO

