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

 Date: 23/04/2026 18:06:38
*/


-- ----------------------------
-- Table structure for Unpolite
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[Unpolite]') AND type IN ('U'))
	DROP TABLE [dbo].[Unpolite]
GO

CREATE TABLE [dbo].[Unpolite] (
  [upId] int  IDENTITY(1,1) NOT NULL,
  [word] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [createdAt] datetime2(7) DEFAULT getdate() NOT NULL,
  [updatedAt] datetime2(7)  NOT NULL,
  [deletedAt] datetime2(7)  NULL
)
GO

ALTER TABLE [dbo].[Unpolite] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of Unpolite
-- ----------------------------
SET IDENTITY_INSERT [dbo].[Unpolite] ON
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt]) VALUES (N'1', N'你爸爸死', N'2026-04-21 07:21:57.5970000', N'2026-04-21 07:21:57.5970000', NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt]) VALUES (N'2', N'草泥马', N'2026-04-21 09:47:43.1290000', N'2026-04-21 09:47:43.1290000', NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt]) VALUES (N'3', N'操你妈', N'2026-04-21 09:47:57.2990000', N'2026-04-21 09:47:57.2990000', NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt]) VALUES (N'4', N'打飞机', N'2026-04-21 09:48:44.2770000', N'2026-04-21 09:48:44.2770000', NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt]) VALUES (N'5', N'Fuck U', N'2026-04-21 09:48:53.3090000', N'2026-04-21 09:48:53.3090000', NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt]) VALUES (N'6', N'妈逼', N'2026-04-21 09:49:02.7800000', N'2026-04-21 09:49:02.7800000', NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt]) VALUES (N'7', N'เปรต', N'2026-04-21 09:49:19.3460000', N'2026-04-21 09:49:19.3460000', NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt]) VALUES (N'8', N'เย็ดแม่', N'2026-04-21 09:49:25.7410000', N'2026-04-21 09:49:25.7410000', NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt]) VALUES (N'9', N'ควย', N'2026-04-21 09:49:33.7860000', N'2026-04-21 09:49:33.7860000', NULL)
GO

SET IDENTITY_INSERT [dbo].[Unpolite] OFF
GO


-- ----------------------------
-- Auto increment value for Unpolite
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[Unpolite]', RESEED, 9)
GO


-- ----------------------------
-- Primary Key structure for table Unpolite
-- ----------------------------
ALTER TABLE [dbo].[Unpolite] ADD CONSTRAINT [Unpolite_pkey] PRIMARY KEY CLUSTERED ([upId])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO

