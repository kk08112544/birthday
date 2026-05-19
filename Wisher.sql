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

 Date: 19/05/2026 08:59:03
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

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) VALUES (N'1', N'ครบรอบ 63 ปี กรมพัฒนาที่ดิน ดินนำ น้ำตาม สู่ความยั่งยืนเกษตรไทย ขอให้หน่วยงานเจริญก้าวหน้า เป็นที่พึ่งของเกษตรกรในการพัฒนาที่ดินอย่างยั่งยืน', N'1', N'2026-05-10 15:06:50.7640000', NULL, N'2026-05-18 09:29:17.1850000')
GO

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) VALUES (N'2', N'hbd ldd', N'1', N'2026-05-10 15:06:50.7640000', NULL, N'2026-05-18 09:29:17.1890000')
GO

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) VALUES (N'3', N'สุขสันต์วันเกิด', N'1', N'2026-05-10 15:06:50.7640000', NULL, N'2026-05-18 09:29:17.1930000')
GO

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) VALUES (N'4', N'ครบรอบ 63 ปีสถาปนากรมพัฒนาที่ดิน ขอให้กรมพัฒนาที่ดินได้พัฒนาการเกษตรอย่างยั่งยืน', N'1', N'2026-05-10 15:06:50.7640000', N'2026-05-13 04:22:10.0940000', N'2026-05-13 04:22:10.0940000')
GO

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) VALUES (N'5', N'I Love Land development department', N'1', N'2026-05-10 15:06:50.7640000', NULL, N'2026-05-18 09:29:17.1990000')
GO

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) VALUES (N'6', N'Happy Birthday to LDD', N'1', N'2026-05-10 15:06:50.7640000', NULL, N'2026-05-18 09:29:17.2040000')
GO

INSERT INTO [dbo].[Wisher] ([wId], [wishWord], [festivalId], [createdAt], [deletedAt], [updatedAt]) VALUES (N'7', N'祝您生日快乐', N'1', N'2026-05-13 00:53:39.9960000', NULL, N'2026-05-18 09:29:17.2080000')
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

