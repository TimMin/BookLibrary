Ext.define('App.store.PersonStore',
{
    extend: 'Ext.data.Store',
    model: 'App.model.Person',
    autoLoad: false,
    autoSync: false,
    storeId: 'Person',
    pageSize: 10
});