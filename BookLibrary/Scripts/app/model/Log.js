Ext.define('App.model.Log',
{
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        { name: 'Id', type: 'int', defaultValue: 0 },
        { name: 'Book', type: 'int' },
        { name: 'Person', type: 'int' },
        {
            name: 'Borrowed', type: 'date',
            dateFormat: 'MS',
            serialize: function (value, record) {
                //Convert date type that .NET can bind to DateTime
                var date = new Date(parseInt(value.substr(6)));
                return Ext.Date.format(date, "d-m-Y"); //Full Date Time
            }
        },
         {
             name: 'Returned', type: 'date',
             dateFormat: 'MS',
             serialize: function (value, record) {
                 //Convert date type that .NET can bind to DateTime
                 var date = new Date(parseInt(value.substr(6)));
                 return Ext.Date.format(date, "d-m-Y"); //Full Date Time
             }
         }
    ],
    proxy:
     {
         type: 'ajax',
         api:
         {
             read: 'Home/GetLogData'
         },
         reader:
         {
             type: 'json',
             root: 'logEntry',
             totalProperty: 'TotalCount'
         }
     }
});