Ext.define('App.model.Person',
{
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        { name: 'Id', type: 'int', defaultValue: 0 },
        { name: 'Name', type: 'string' },
        { name: 'Surname', type: 'string' },
        {
            name: 'DateOfBirth', type: 'date', 
            dateFormat: 'MS',
            serialize: function (value, record) {
                //Convert date type that .NET can bind to DateTime
                var date = new Date(parseInt(value.substr(6)));
                return Ext.Date.format(date, "d-m-Y"); //Full Date Time
            }
        },
        { name: 'BooksData', type: '' } //типа для книг, которые должен
    ],
    proxy:
     {
         
         type: 'ajax',
         api:
         {
             read: 'Home/GetPersonsData'
         },
         reader:
         {
             type: 'json',
             root: 'persons',
             totalProperty: 'TotalCount'
         },
  
     }
});