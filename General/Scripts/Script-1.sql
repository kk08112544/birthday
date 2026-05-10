--INSERT INTO dbo.[User]
--(firstName, userName, password)
--VALUES
--(N'แอดมิน1', 'admin1', '$2a$12$LpmlhE7iO4gfN9BZmxBWm.2Rda30alkPUGkP0ZWknUdiceaOrbfvu');
--CREATE TABLE [dbo].[User] (
--  [uId] int  IDENTITY(1,1) NOT NULL,
--  [firstName] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
--  [userName] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
--  [password] nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL
--)

SELECT * FROM dbo.[User] u 
