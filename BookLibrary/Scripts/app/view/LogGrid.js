
Ext.define('App.view.LogGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.logGrid',

    scrollable: true,
    id: 'logGrid',
    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            displayMsg: '',
            emptyMsg: '',
            store: 'App.store.LogStore',
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

                },
            ],



        }
    ],

    initComponent: function () {
        var me = this;

        Ext.applyIf(me,
         {
             store: 'App.store.LogStore',
             columns: [
             {
                 text: 'Id',
                 dataIndex: 'Id'
             },
             {
                 text: 'Id Читателя',
                 dataIndex: 'Person'
             },
             {
                 text: 'Id Книги',
                 dataIndex: 'Book'
             },
              {
                  text: 'Дата выдачи',
                  type: 'date',
                  dataIndex: 'Borrowed',
                  format: 'd/m/Y',
              },
                 {
                     text: 'Дата возврата',
                     type: 'date',
                     dataIndex: 'Returned',
                     format: 'd/m/Y', 
                 },
             ],

             title: 'Журнал',

         });

        me.callParent(arguments);
    }
});