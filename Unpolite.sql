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

 Date: 20/05/2026 17:40:54
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
  [deletedAt] datetime2(7)  NULL,
  [createdBy] int  NOT NULL,
  [deletedBy] int  NULL,
  [updatedBy] int  NULL
)
GO

ALTER TABLE [dbo].[Unpolite] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of Unpolite
-- ----------------------------
SET IDENTITY_INSERT [dbo].[Unpolite] ON
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt], [createdBy], [deletedBy], [updatedBy]) VALUES (N'1', N'อีตูด', N'2026-05-20 09:34:04.5620000', N'2026-05-20 09:41:18.7440000', NULL, N'1', NULL, N'1')
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt], [createdBy], [deletedBy], [updatedBy]) VALUES (N'2', N'操你妈', N'2026-05-20 09:39:31.0180000', N'2026-05-20 09:42:35.6100000', N'2026-05-20 09:42:35.6030000', N'1', N'1', NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt], [createdBy], [deletedBy], [updatedBy]) VALUES (N'3', N'操你妈', N'2026-05-20 09:43:19.9470000', N'2026-05-20 09:43:19.9470000', NULL, N'1', NULL, NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt], [createdBy], [deletedBy], [updatedBy]) VALUES (N'4', N'畜生', N'2026-05-20 09:43:26.9000000', N'2026-05-20 09:43:26.9000000', NULL, N'1', NULL, NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt], [createdBy], [deletedBy], [updatedBy]) VALUES (N'5', N'妈逼', N'2026-05-20 09:43:34.1770000', N'2026-05-20 09:43:34.1770000', NULL, N'1', NULL, NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt], [createdBy], [deletedBy], [updatedBy]) VALUES (N'6', N'打飞机', N'2026-05-20 09:43:41.7950000', N'2026-05-20 09:43:41.7950000', NULL, N'1', NULL, NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt], [createdBy], [deletedBy], [updatedBy]) VALUES (N'7', N'fuck you', N'2026-05-20 09:43:50.2030000', N'2026-05-20 09:43:50.2030000', NULL, N'1', NULL, NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt], [createdBy], [deletedBy], [updatedBy]) VALUES (N'8', N'ควย', N'2026-05-20 09:43:57.7670000', N'2026-05-20 09:43:57.7670000', NULL, N'1', NULL, NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt], [createdBy], [deletedBy], [updatedBy]) VALUES (N'9', N'เหี้ย', N'2026-05-20 09:44:05.4190000', N'2026-05-20 09:44:05.4190000', NULL, N'1', NULL, NULL)
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


-- ----------------------------
-- Foreign Keys structure for table Unpolite
-- ----------------------------
ALTER TABLE [dbo].[Unpolite] ADD CONSTRAINT [Unpolite_createdBy_fkey] FOREIGN KEY ([createdBy]) REFERENCES [dbo].[User] ([uId]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

ALTER TABLE [dbo].[Unpolite] ADD CONSTRAINT [Unpolite_updatedBy_fkey] FOREIGN KEY ([updatedBy]) REFERENCES [dbo].[User] ([uId]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

ALTER TABLE [dbo].[Unpolite] ADD CONSTRAINT [Unpolite_deletedBy_fkey] FOREIGN KEY ([deletedBy]) REFERENCES [dbo].[User] ([uId]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

