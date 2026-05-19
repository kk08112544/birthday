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

 Date: 19/05/2026 08:59:11
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

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt]) VALUES (N'1', N'เย็ดแม่', N'2026-05-10 15:08:38.8810000', N'2026-05-13 00:52:34.3950000', NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt]) VALUES (N'2', N'เชี่ย', N'2026-05-10 15:08:45.0710000', N'2026-05-13 00:49:00.0170000', NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt]) VALUES (N'3', N'操你妈', N'2026-05-10 15:08:56.5530000', N'2026-05-15 01:42:52.0380000', NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt]) VALUES (N'4', N'妈逼', N'2026-05-10 15:09:06.5110000', N'2026-05-13 01:02:32.2550000', NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt]) VALUES (N'5', N'畜生', N'2026-05-10 15:09:18.5960000', N'2026-05-18 04:01:25.0940000', NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt]) VALUES (N'6', N'กู', N'2026-05-10 15:09:35.3550000', N'2026-05-18 02:37:58.9100000', NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt]) VALUES (N'7', N'มึง', N'2026-05-10 15:09:41.7880000', N'2026-05-18 10:30:55.6830000', N'2026-05-18 10:30:55.6640000')
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt]) VALUES (N'8', N'ควย', N'2026-05-10 15:20:24.2560000', N'2026-05-15 04:49:59.0490000', NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt]) VALUES (N'9', N'แม่ง', N'2026-05-10 15:20:35.0390000', N'2026-05-13 00:48:47.9960000', NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt]) VALUES (N'10', N'Fuck You', N'2026-05-10 15:20:48.7910000', N'2026-05-15 01:44:23.9060000', NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt]) VALUES (N'11', N'มึง', N'2026-05-15 02:33:32.7060000', N'2026-05-18 03:59:40.1520000', NULL)
GO

INSERT INTO [dbo].[Unpolite] ([upId], [word], [createdAt], [updatedAt], [deletedAt]) VALUES (N'12', N'ควยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยยย', N'2026-05-18 03:11:39.0350000', N'2026-05-18 03:33:57.2850000', N'2026-05-18 03:33:57.2710000')
GO

SET IDENTITY_INSERT [dbo].[Unpolite] OFF
GO


-- ----------------------------
-- Auto increment value for Unpolite
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[Unpolite]', RESEED, 12)
GO


-- ----------------------------
-- Primary Key structure for table Unpolite
-- ----------------------------
ALTER TABLE [dbo].[Unpolite] ADD CONSTRAINT [Unpolite_pkey] PRIMARY KEY CLUSTERED ([upId])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO

