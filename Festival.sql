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

 Date: 20/05/2026 17:40:26
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
  [deletedAt] datetime2(7)  NULL,
  [logo] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [webName] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [endDate] datetime2(7)  NOT NULL,
  [isDelete] bit DEFAULT 1 NOT NULL,
  [isEdit] bit DEFAULT 1 NOT NULL,
  [startDate] datetime2(7)  NOT NULL,
  [createdBy] int  NOT NULL,
  [deletedBy] int  NULL,
  [isEditStartEndDate] bit DEFAULT 1 NOT NULL,
  [updatedBy] int  NULL
)
GO

ALTER TABLE [dbo].[Festival] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of Festival
-- ----------------------------
SET IDENTITY_INSERT [dbo].[Festival] ON
GO

INSERT INTO [dbo].[Festival] ([fId], [festivalName], [image], [createdAt], [updatedAt], [deletedAt], [logo], [webName], [endDate], [isDelete], [isEdit], [startDate], [createdBy], [deletedBy], [isEditStartEndDate], [updatedBy]) VALUES (N'1', N'เนื่องในวันครบรอบสถาปนากรมพัฒนาที่ดิน-ศทส-2569', N'Fileupload-1779271432977.png', N'2026-05-20 10:03:53.1980000', N'2026-05-20 10:05:03.9520000', NULL, N'Fileupload-1779271503854.png', N'ร่วมอวยพรวันสถาปนากรมพัฒนาที่ดิน 2569', N'2026-06-05 00:00:00.0000000', N'1', N'1', N'2026-05-25 00:00:00.0000000', N'1', NULL, N'1', N'1')
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


-- ----------------------------
-- Foreign Keys structure for table Festival
-- ----------------------------
ALTER TABLE [dbo].[Festival] ADD CONSTRAINT [Festival_createdBy_fkey] FOREIGN KEY ([createdBy]) REFERENCES [dbo].[User] ([uId]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

ALTER TABLE [dbo].[Festival] ADD CONSTRAINT [Festival_deletedBy_fkey] FOREIGN KEY ([deletedBy]) REFERENCES [dbo].[User] ([uId]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

ALTER TABLE [dbo].[Festival] ADD CONSTRAINT [Festival_updatedBy_fkey] FOREIGN KEY ([updatedBy]) REFERENCES [dbo].[User] ([uId]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO

