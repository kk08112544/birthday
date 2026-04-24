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

 Date: 24/04/2026 16:28:48
*/


-- ----------------------------
-- Table structure for Wisher
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[Wisher]') AND type IN ('U'))
	DROP TABLE [dbo].[Wisher]
GO

CREATE TABLE [dbo].[Wisher] (
  [wId] int  IDENTITY(1,1) NOT NULL,
  [wishWord] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [festivalId] int  NOT NULL,
  [createdAt] datetime2(7) DEFAULT getdate() NOT NULL,
  [deletedAt] datetime2(7)  NULL,
  [updatedAt] datetime2(7)  NOT NULL
)
GO

ALTER TABLE [dbo].[Wisher] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of Wisher
-- ----------------------------
SET IDENTITY_INSERT [dbo].[Wisher] ON
GO

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) VALUES (N'2', N'hbd ldd', N'1', N'2026-04-21 14:18:52.0000000', NULL, N'2026-04-21 14:19:04.0000000')
GO

SET IDENTITY_INSERT [dbo].[Wisher] OFF
GO


-- ----------------------------
-- Auto increment value for Wisher
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[Wisher]', RESEED, 4)
GO


-- ----------------------------
-- Primary Key structure for table Wisher
-- ----------------------------
ALTER TABLE [dbo].[Wisher] ADD CONSTRAINT [Wisher_pkey] PRIMARY KEY CLUSTERED ([wId])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Foreign Keys structure for table Wisher
-- ----------------------------
ALTER TABLE [dbo].[Wisher] ADD CONSTRAINT [Wisher_festivalId_fkey] FOREIGN KEY ([festivalId]) REFERENCES [dbo].[Festival] ([fId]) ON DELETE NO ACTION ON UPDATE CASCADE
GO

