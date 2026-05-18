-- /*
--   Warnings:

--   - You are about to drop the column `endDate` on the `Festival` table. All the data in the column will be lost.
--   - You are about to drop the column `isDelete` on the `Festival` table. All the data in the column will be lost.
--   - You are about to drop the column `isEdit` on the `Festival` table. All the data in the column will be lost.
--   - You are about to drop the column `isEditEndDate` on the `Festival` table. All the data in the column will be lost.
--   - You are about to drop the column `startDate` on the `Festival` table. All the data in the column will be lost.

-- */
-- BEGIN TRY

-- BEGIN TRAN;

-- -- Drop default constraint before altering column
-- IF EXISTS (
--     SELECT 1 FROM sys.default_constraints
--     WHERE name = 'Festival_isDelete_df'
-- )
-- BEGIN
--     ALTER TABLE [Festival] DROP CONSTRAINT [Festival_isDelete_df];
-- END

-- IF EXISTS (SELECT 1 FROM sys.default_constraints WHERE name = 'Festival_isEdit_df')
--     ALTER TABLE [Festival] DROP CONSTRAINT [Festival_isEdit_df];

-- -- AlterTable
-- ALTER TABLE [dbo].[Festival] DROP COLUMN [endDate],
-- [isDelete],
-- [isEdit],
-- [isEditEndDate],
-- [startDate];

-- COMMIT TRAN;

-- END TRY
-- BEGIN CATCH

-- IF @@TRANCOUNT > 0
-- BEGIN
--     ROLLBACK TRAN;
-- END;
-- THROW

-- END CATCH
/*
  Warnings:

  - You are about to drop the column `endDate` on the `Festival` table. All the data in the column will be lost.
  - You are about to drop the column `isDelete` on the `Festival` table. All the data in the column will be lost.
  - You are about to drop the column `isEdit` on the `Festival` table. All the data in the column will be lost.
  - You are about to drop the column `isEditEndDate` on the `Festival` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Festival` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- Drop ALL default constraints on Festival table
DECLARE @sql NVARCHAR(MAX) = '';
SELECT @sql += 'ALTER TABLE [Festival] DROP CONSTRAINT [' + dc.name + '];' + CHAR(10)
FROM sys.default_constraints dc
JOIN sys.tables t ON dc.parent_object_id = t.object_id
WHERE t.name = 'Festival';
EXEC sp_executesql @sql;

-- AlterTable
ALTER TABLE [dbo].[Festival] DROP COLUMN [endDate],
[isDelete],
[isEdit],
[isEditEndDate],
[startDate];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH