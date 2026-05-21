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

 Date: 20/05/2026 17:40:43
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

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) 
VALUES (N'1', N'ครบรอบ 63 ปี กรมพัฒนาที่ดิน ดินนำ น้ำตาม สู่ความยั่งยืนเกษตรไทย ขอให้หน่วยงานเจริญก้าวหน้า เป็นที่พึ่งของเกษตรกรในการพัฒนาที่ดินอย่างยั่งยืน', N'1', N'2026-05-20 10:03:53.1980000', NULL, N'2026-05-20 10:05:03.8940000')
GO

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) 
VALUES (N'2', N'hbd ldd', N'1', N'2026-05-20 10:03:53.1980000', NULL, N'2026-05-20 10:05:03.8980000')
GO

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) 
VALUES (N'3', N'สุขสันต์วันเกิด', N'1', N'2026-05-20 10:03:53.1980000', NULL, N'2026-05-20 10:05:03.9030000')
GO

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) 
VALUES (N'4', N'I Love Land development department', N'1', N'2026-05-20 10:03:53.1980000', NULL, N'2026-05-20 10:05:03.9060000')
GO

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) 
VALUES (N'5', N'Happy Birthday to LDD', N'1', N'2026-05-20 10:03:53.1980000', NULL, N'2026-05-20 10:05:03.9130000')
GO

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) 
VALUES (N'6', N'祝您生日快乐', N'1', N'2026-05-20 10:03:53.1980000', NULL, N'2026-05-20 10:05:03.9160000')
GO

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) 
VALUES (N'7', N'Love you LDD', N'1', N'2026-05-20 10:04:45.2010000', NULL, N'2026-05-20 10:05:03.9200000')
GO

SET IDENTITY_INSERT [dbo].[Wisher] OFF
GO


-- ----------------------------
-- Auto increment value for Wisher
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[Wisher]', RESEED, 7)
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

