
Ext.define('App.view.BookGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bookGrid',

    scrollable: true,
    id:'bookGrid',
    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            store: 'App.store.BookStore',
            displayMsg: '',
            emptyMsg: '',
            dock: 'bottom',

        },
        {
            xtype: 'panel',
            dock: 'top',
            layout: {
                type: 'hbox',
                align: 'right',
                pack: 'right'
            },
            items: [
                {
                    xtype: 'tbspacer',
                    flex: 1
                }                
            ]
        }
    ],

    initComponent: function () {
        var me = this;

        Ext.applyIf(me,
         {
            store: 'App.store.BookStore',
            columns: [
            {
                text: 'Автор',
                dataIndex: 'Author'
            },
            {
                text: 'Имя',
                dataIndex: 'Name'
            },
            {
                text: 'Id',
                dataIndex: 'Id'
            }],
            height: 350,
            width: 800,
            title: 'Книги'
        });

        me.callParent(arguments);
    }
});