IF EXISTS (
    SELECT 1
    FROM sys.default_constraints dc
    JOIN sys.columns c
        ON dc.parent_object_id = c.object_id
        AND dc.parent_column_id = c.column_id
    WHERE dc.parent_object_id = OBJECT_ID('Festival')
      AND c.name = 'isActive'
)
BEGIN
    DECLARE @ConstraintName NVARCHAR(200);

    SELECT @ConstraintName = dc.name
    FROM sys.default_constraints dc
    JOIN sys.columns c
        ON dc.parent_object_id = c.object_id
        AND dc.parent_column_id = c.column_id
    WHERE dc.parent_object_id = OBJECT_ID('Festival')
      AND c.name = 'isActive';

    EXEC('ALTER TABLE [Festival] DROP CONSTRAINT [' + @ConstraintName + ']');
END;

ALTER TABLE [Festival]
ALTER COLUMN [isActive] BIT NOT NULL;