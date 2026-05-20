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

 Date: 20/05/2026 17:40:34
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

INSERT INTO [dbo].[Card] ([cId], [imageCard], [festivalId], [createdAt], [updatedAt], [deletedAt]) VALUES (N'1', N'Fileupload-1779271432994.jpeg', N'1', N'2026-05-20 10:03:53.1980000', N'2026-05-20 10:05:03.9310000', NULL)
GO

INSERT INTO [dbo].[Card] ([cId], [imageCard], [festivalId], [createdAt], [updatedAt], [deletedAt]) VALUES (N'2', N'Fileupload-1779271432995.jpeg', N'1', N'2026-05-20 10:03:53.1980000', N'2026-05-20 10:05:03.9360000', NULL)
GO

INSERT INTO [dbo].[Card] ([cId], [imageCard], [festivalId], [createdAt], [updatedAt], [deletedAt]) VALUES (N'3', N'Fileupload-1779271432996.jpeg', N'1', N'2026-05-20 10:03:53.1980000', N'2026-05-20 10:05:03.9380000', NULL)
GO

INSERT INTO [dbo].[Card] ([cId], [imageCard], [festivalId], [createdAt], [updatedAt], [deletedAt]) VALUES (N'4', N'Fileupload-1779271432997.jpeg', N'1', N'2026-05-20 10:03:53.1980000', N'2026-05-20 10:05:03.9430000', NULL)
GO

INSERT INTO [dbo].[Card] ([cId], [imageCard], [festivalId], [createdAt], [updatedAt], [deletedAt]) VALUES (N'5', N'Fileupload-1779271432997.jpeg', N'1', N'2026-05-20 10:03:53.1980000', N'2026-05-20 10:05:03.9470000', NULL)
GO

SET IDENTITY_INSERT [dbo].[Card] OFF
GO


-- ----------------------------
-- Auto increment value for Card
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[Card]', RESEED, 5)
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

