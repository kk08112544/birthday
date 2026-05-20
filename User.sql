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

 Date: 20/05/2026 14:41:44
*/


-- ----------------------------
-- Table structure for User
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[User]') AND type IN ('U'))
	DROP TABLE [dbo].[User]
GO

CREATE TABLE [dbo].[User] (
  [uId] int  IDENTITY(1,1) NOT NULL,
  [firstName] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [userName] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [password] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [role] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT 'admin' NOT NULL,
  [createdAt] datetime2(7) DEFAULT getdate() NOT NULL,
  [deletedAt] datetime2(7)  NULL,
  [updatedAt] datetime2(7)  NOT NULL,
  [phoneNumber] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [email] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL
)
GO

ALTER TABLE [dbo].[User] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Records of User
-- ----------------------------
SET IDENTITY_INSERT [dbo].[User] ON
GO

INSERT INTO [dbo].[User] ([uId], [firstName], [userName], [password], [role], [createdAt], [deletedAt], [updatedAt], [phoneNumber], [email]) VALUES (N'1', N'แอดมิน-ศทส', N'admin1', N'$2a$12$rs4g8z2n/VbeP6OOoSLuo.mBh3Xlb8XoUM4sxiBbGXb17pIRKsHgq', N'superAdmin', N'2026-05-15 13:07:51.7700000', NULL, N'2026-05-15 13:07:51.7700000', N'1328', N'cit_3@ldd.go.th')
GO

INSERT INTO [dbo].[User] ([uId], [firstName], [userName], [password], [role], [createdAt], [deletedAt], [updatedAt], [phoneNumber], [email]) VALUES (N'2', N'แอดมิน2-กกจ', N'admin2', N'$2b$12$PNwtS5twnD/xnH6DPDtNpux9EplslYFyW5TiXbWl4OOvMNXNB8PhC', N'admin', N'2026-05-15 09:06:42.5010000', NULL, N'2026-05-20 05:56:21.3580000', N'1128', N'cit_1@ldd.go.th')
GO

SET IDENTITY_INSERT [dbo].[User] OFF
GO


-- ----------------------------
-- Auto increment value for User
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[User]', RESEED, 2)
GO


-- ----------------------------
-- Primary Key structure for table User
-- ----------------------------
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([uId])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO

