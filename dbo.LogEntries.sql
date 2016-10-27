CREATE TABLE [dbo].[LogEntries] (
    [Id]       INT      IDENTITY (1, 1) NOT NULL,
    [Person]   INT      NOT NULL,
    [Book]     INT      NOT NULL,
    [Borrowed] DATETIME NOT NULL,
    [Returned] DATETIME NULL,
    CONSTRAINT [PK_dbo.LogEntries] PRIMARY KEY CLUSTERED ([Id] ASC)
);

