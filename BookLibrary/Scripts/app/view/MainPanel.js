
Ext.define('App.view.MainPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mainPanel',
    requires: ['App.view.BooksPanel'],

    controller: 'mainPanelController',
    layout: 'hbox',
    border: false,
    height:1500,
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'booksPanel',
                    flex: 5,
                    align: 'stretch',
                    title: 'Книги',
                    height: 600
                },
                {
                    xtype: 'readersPanel',
                    flex: 5,
                    align: 'stretch',
                    title: 'Читатели',
                    height: 600,
                },
               

            ]
        });

        me.callParent(arguments);
    }
});