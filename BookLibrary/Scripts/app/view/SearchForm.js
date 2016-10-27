Ext.define('App.view.SearchForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.searchForm',
    controller: 'mainPanelController',


    initComponent: function () {
        var me = this;
        
        
        Ext.applyIf(me, {
            name: 'search',
            layout: {
                type: 'table',
                columns: 2
            },
            items: [
                {
                    inputType: 'Name',
                    xtype: 'textfield',
                    fieldLabel: 'Поиск',
                    name: 'Name'
                }, {
                    xtype: 'radiogroup',
                    fieldLabel: 'Атрибут',
                    name:'atribute',
                    items: [{
                        boxLabel: 'Название',
                        name: 'atr',
                        inputValue: 'Name',
                        checked:true,
                    }, {
                        boxLabel: 'Автор',
                        name: 'atr',
                        inputValue: 'Author'
                    }]
                }, {
                    xtype: 'checkboxfield',
                    boxLabel: 'В архиве',
                    name: 'thereIs',
                    inputValue: '1',
                    id: 'thereIs',
                    listeners: {
                        change: function () {

                            gridBooks = Ext.getCmp('bookGrid'),                            
                            gridBooksStore = gridBooks.store;
                            searchBooksForm = me;
                            keyWord = searchBooksForm.down('textfield[name=Name]').getValue();
                            attribute = searchBooksForm.down('radiogroup[name=atribute]').getChecked()[0].inputValue;
                            thereIs = searchBooksForm.down('checkboxfield[name=thereIs]').getValue();
                            gridBooksStore.load(
                                { params: { keyWord: keyWord, attribute: attribute, thereIs: thereIs} },
                                function () {
                                    gridBooks.getView().refresh();
                                });

                        }
                    },
                }
            ],
            buttons: [{                         // набор кнопок. Здесь она всего одна
                text: 'поиск',
                name: 'searchBook',

 
                }
            ]

        });

        me.callParent(arguments);
    }
});