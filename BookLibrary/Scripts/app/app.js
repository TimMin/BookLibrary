Ext.Loader.setPath('widget.App', '/Scripts/app');
Ext.Loader.setPath('App', '/Scripts/app');
Ext.application({
    appFolder: 'Scripts',
    requires: [
        'Ext.container.Viewport',
        'App.view.MainPanel'
    ],
    name: 'Library',
    controllers: ['App.controller.MainPanelController'],
    stores: [
        'App.store.BookStore'
    ],

    launch: function () {
        Ext.create('Ext.container.Viewport',
        {
            layout: 'fit',
            renderTo: Ext.getBody(),
            items: [{
                xtype: 'container',
                items: [{
                    xtype: 'mainPanel'
                }]
            }]
        });
    }
});