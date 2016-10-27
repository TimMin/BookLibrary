Ext.define('App.view.ReadersPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.readersPanel',
    requires: ['App.view.ReadersGrid', 'App.view.SearchPersonForm', 'App.view.RegistrationReadersPanel'],
    controller: 'mainPanelController',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },
    border: false,
    
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [            
                {
                    xtype: 'registrationReaders',
                    itemId: 'registrationReaders'
                },
                  {
                      xtype: 'searchPersonForm',
                      itemId: 'searchPersonForm'
                  },
                {
                    xtype: 'readersGrid',
                    name: 'readersGrid'
                }
            ]
        });

        me.callParent(arguments);
    }
});