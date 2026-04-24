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

 Date: 24/04/2026 14:21:37
*/


-- ----------------------------
-- Table structure for Festival
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[Festival]') AND type IN ('U'))
	DROP TABLE [dbo].[Festival]
GO

CREATE TABLE [dbo].[Festival] (
  [fId] int  IDENTITY(1,1) NOT NULL,
  [festivalName] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [image] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [createdAt] datetime2(7) DEFAULT getdate() NOT NULL,
  [updatedAt] datetime2(7)  NOT NULL,
  [deletedAt] datetime2(7)  NULL
)
GO

ALTER TABLE [dbo].[Festival] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of Festival
-- ----------------------------
SET IDENTITY_INSERT [dbo].[Festival] ON
GO

INSERT INTO [dbo].[Festival] ([fId], [festivalName], [image], [createdAt], [updatedAt], [deletedAt]) VALUES (N'1', N'เนื่องในวันครบรอบสถาปนากรมพัฒนาที่ดิน 63ปี', N'Fileupload-1776915026094.png', N'2026-04-21 14:18:29.0000000', N'2026-04-21 14:18:32.0000000', NULL)
GO

SET IDENTITY_INSERT [dbo].[Festival] OFF
GO


-- ----------------------------
-- Auto increment value for Festival
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[Festival]', RESEED, 1)
GO


-- ----------------------------
-- Primary Key structure for table Festival
-- ----------------------------
ALTER TABLE [dbo].[Festival] ADD CONSTRAINT [Festival_pkey] PRIMARY KEY CLUSTERED ([fId])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO

