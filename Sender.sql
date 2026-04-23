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

 Date: 23/04/2026 18:06:31
*/


-- ----------------------------
-- Table structure for Sender
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[Sender]') AND type IN ('U'))
	DROP TABLE [dbo].[Sender]
GO

CREATE TABLE [dbo].[Sender] (
  [sId] int  IDENTITY(1,1) NOT NULL,
  [position] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [department] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [cardId] int  NOT NULL,
  [wishId] int  NOT NULL,
  [createdAt] datetime2(7) DEFAULT getdate() NOT NULL,
  [festivalId] int  NOT NULL,
  [fullname] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL
)
GO

ALTER TABLE [dbo].[Sender] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of Sender
-- ----------------------------
SET IDENTITY_INSERT [dbo].[Sender] ON
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'7', N'นักวิชาการคอมพิวเตอร์ปฏิบัติการ', N'ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร', N'8', N'2', N'2026-04-21 07:21:15.1030000', N'1', N'นาย สุวรา สังข์ทอง')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'8', N'นักวิชาการคอมพิวเตอร์ปฏิบัติการ', N'ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร', N'8', N'2', N'2026-04-21 10:17:09.8300000', N'1', N'นาย เอ บี')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'9', N'นักวิชาการคอมพิวเตอร์ชำนาญการ', N'ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร', N'8', N'2', N'2026-04-21 10:17:38.3530000', N'1', N'นาย  ก ข')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'10', N'นักวิชาการแผนที่ชำนาญการพิเศษ', N'ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร', N'8', N'2', N'2026-04-21 10:18:05.6380000', N'1', N'นาย  ก ข')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'11', N'นักวิชาการแผนที่ชำนาญการพิเศษ', N'ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร', N'8', N'2', N'2026-04-21 10:18:18.8540000', N'1', N'นางสาว ดินดี คนสวย')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'12', N'นักวิชาการแผนที่ชำนาญการพิเศษ', N'ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร', N'8', N'2', N'2026-04-21 10:36:48.7980000', N'1', N'เปรต')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'13', N'นักวิชาการแผนที่ชำนาญการพิเศษ', N'ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร', N'8', N'2', N'2026-04-21 10:38:25.8780000', N'1', N'เปรต')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'14', N'นักวิชาการแผนที่ชำนาญการพิเศษ', N'ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร', N'8', N'2', N'2026-04-21 10:38:38.5960000', N'1', N'ควย')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'15', N'นักวิชาการแผนที่ชำนาญการพิเศษ', N'ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร', N'8', N'2', N'2026-04-21 10:39:16.0100000', N'1', N'สัส')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'16', N'นักวิชาการ', N'รัก', N'8', N'2', N'2026-04-21 10:44:03.8380000', N'1', N'เคเค')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'17', N'นักวิชาการ', N'รักFuck  U', N'8', N'2', N'2026-04-21 10:45:50.1560000', N'1', N'เคเค')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'18', N'นักวิชาการ', N'รักFuck ', N'8', N'2', N'2026-04-21 10:46:00.5020000', N'1', N'เคเค')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'19', N'นักวิชาการ', N'รักFuck ', N'8', N'2', N'2026-04-23 01:23:51.9700000', N'1', N'เคเค')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'20', N'นักวิชาการคอม', N'ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร', N'8', N'2', N'2026-04-23 01:26:19.1230000', N'1', N'เคเค')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'21', N'นักวิชาการคอมพิวเตอร์ปฏิบัติการ', N'ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร', N'8', N'2', N'2026-04-23 01:28:22.6790000', N'1', N'เคเค')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'22', N'นักวิชาการคอมพิวเตอร์ปฏิบัติการ', N'ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร', N'8', N'2', N'2026-04-23 07:24:07.0910000', N'1', N'เคเคมึง')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'23', N'นักวิชาการคอมพิวเตอร์ปฏิบัติการ', N'ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร', N'8', N'2', N'2026-04-23 07:24:49.4850000', N'1', N'เคเคเย็ด')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'24', N'นักวิชาการคอมพิวเตอร์ปฏิบัติการ', N'ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร', N'8', N'2', N'2026-04-23 07:24:52.3950000', N'1', N'เคเค')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'25', N'นักวิชาการคอมพิวเตอร์ปฏิบัติการ', N'ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร', N'8', N'2', N'2026-04-23 10:01:13.1280000', N'1', N'เคเค')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'27', N'sdfsdfdsf', N'sdf', N'8', N'2', N'2026-04-23 10:27:00.7300000', N'1', N'sdfsd')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'28', N'นักวิชาการคอมพิวเตอร์ชำนาญการ', N'ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร', N'8', N'2', N'2026-04-23 10:31:22.4750000', N'1', N'นางสาวเอ บี')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'29', N'dsf', N'dsfdsf', N'10', N'2', N'2026-04-23 10:33:15.2160000', N'1', N'sdf')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'30', N'sdad', N'asdads', N'11', N'2', N'2026-04-23 10:34:47.5400000', N'1', N'zaas')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'31', N'dfsdsf', N'sdfsdf', N'8', N'2', N'2026-04-23 10:52:29.9170000', N'1', N'sdfdf')
GO

INSERT INTO [dbo].[Sender] ([sId], [position], [department], [cardId], [wishId], [createdAt], [festivalId], [fullname]) VALUES (N'32', N'dsfdsf', N'dfdsfsdf', N'8', N'2', N'2026-04-23 10:55:41.1950000', N'1', N'sdf')
GO

SET IDENTITY_INSERT [dbo].[Sender] OFF
GO


-- ----------------------------
-- Auto increment value for Sender
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[Sender]', RESEED, 32)
GO


-- ----------------------------
-- Primary Key structure for table Sender
-- ----------------------------
ALTER TABLE [dbo].[Sender] ADD CONSTRAINT [Sender_pkey] PRIMARY KEY CLUSTERED ([sId])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Foreign Keys structure for table Sender
-- ----------------------------
ALTER TABLE [dbo].[Sender] ADD CONSTRAINT [Sender_cardId_fkey] FOREIGN KEY ([cardId]) REFERENCES [dbo].[Card] ([cId]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

ALTER TABLE [dbo].[Sender] ADD CONSTRAINT [Sender_wishId_fkey] FOREIGN KEY ([wishId]) REFERENCES [dbo].[Wisher] ([wId]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

ALTER TABLE [dbo].[Sender] ADD CONSTRAINT [Sender_festivalId_fkey] FOREIGN KEY ([festivalId]) REFERENCES [dbo].[Festival] ([fId]) ON DELETE NO ACTION ON UPDATE CASCADE
GO

