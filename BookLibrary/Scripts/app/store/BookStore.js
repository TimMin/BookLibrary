Ext.define('App.store.BookStore',
{
    extend: 'Ext.data.Store',
    model: 'App.model.Book',
    autoLoad: false,
    autoSync: false,
    storeId: 'Book',
    pageSize: 10
});