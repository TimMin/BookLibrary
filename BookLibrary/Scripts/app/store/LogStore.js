Ext.define('App.store.LogStore',
{
    id: 'logStore',
    extend: 'Ext.data.Store',
    model: 'App.model.Log',
    autoLoad: true,
    autoSync: false,
    storeId: 'Log',
    pageSize: 10
});