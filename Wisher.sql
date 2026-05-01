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

 Date: 01/05/2026 16:49:22
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

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) VALUES (N'5', N'ครบรอบ 63 ปี กรมพัฒนาที่ดิน ดินนำ น้ำตาม สู่ความยั่งยืนเกษตรไทย ขอให้หน่วยงานเจริญก้าวหน้า เป็นที่พึ่งของเกษตรกรในการพัฒนาที่ดินอย่างยั่งยืนครับ', N'1', N'2026-04-30 03:55:22.4570000', NULL, N'2026-04-30 03:55:22.4570000')
GO

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) VALUES (N'6', N'สุขสันต์วันเกิด', N'1', N'2026-04-30 08:21:21.6750000', NULL, N'2026-05-01 09:19:46.5430000')
GO

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) VALUES (N'7', N'รักกรมพัฒนาที่ดิน', N'1', N'2026-04-30 08:24:38.8950000', NULL, N'2026-05-01 09:21:55.0760000')
GO

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) VALUES (N'8', N'I Love Land development department', N'1', N'2026-04-30 08:24:48.3190000', NULL, N'2026-04-30 08:42:40.6090000')
GO

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) VALUES (N'9', N'Happy Birthday to LDD', N'1', N'2026-04-30 08:25:00.5550000', NULL, N'2026-05-01 09:19:41.9350000')
GO

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) VALUES (N'10', N'รักกรมพัฒนาที่ดิน', N'1', N'2026-04-30 08:27:04.4930000', N'2026-04-30 08:45:52.3630000', N'2026-04-30 08:45:52.3720000')
GO

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) VALUES (N'11', N'', N'1', N'2026-05-01 09:05:47.2510000', N'2026-05-01 09:05:50.0010000', N'2026-05-01 09:05:50.0140000')
GO

SET IDENTITY_INSERT [dbo].[Wisher] OFF
GO


-- ----------------------------
-- Auto increment value for Wisher
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[Wisher]', RESEED, 11)
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

