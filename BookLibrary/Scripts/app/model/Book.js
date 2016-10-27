Ext.define('App.model.Book',
{
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        { name: 'Id', type: 'int', defaultValue: 0 },
        { name: 'Name', type: 'string' },
        { name: 'Author', type: 'string' }
    ],
    proxy:
     {
         type: 'ajax',
         api:
         {
             read: 'Home/GetBooksData',
         },
         reader:
         {
             type: 'json',
             root: 'books',
             totalProperty: 'TotalCount'
         }
     },

});