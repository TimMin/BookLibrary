Ext.define('App.view.BooksPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.booksPanel',
    requires: ['App.view.BookGrid', 'App.view.SearchForm', 'App.view.RegistrationBookPanel'],
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
            items: [            // массив полей формы
                {
                    xtype: 'registrationBook',
                    itemId: 'registrationBook'
                },
                {
                    xtype: 'searchForm',
                    itemId: 'searchForm'
                },
                {
                    xtype: 'bookGrid',
                    name: 'bookGrid'
                }, 


            ],
            buttons: [{
                text: 'Оформить книгу',
                name: 'borrowBook'
            }, {
                text: 'Журнал',
                name: 'log'
            }]
        });

        me.callParent(arguments);
    }
});