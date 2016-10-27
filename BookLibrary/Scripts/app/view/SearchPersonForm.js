Ext.define('App.view.SearchPersonForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.searchPersonForm',
    controller: 'mainPanelController',


    initComponent: function () {
        var me = this;
        
        
        Ext.applyIf(me, {
            name: 'searchPerson',
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
                },
            {
                xtype: 'radiogroup',
                fieldLabel: 'Атрибут',
                name:'atribute',
                items: [{
                    boxLabel: 'Имя',
                    name: 'atr',
                    inputValue: 'Name',
                    checked:true,
                }, {
                    boxLabel: 'Фамилия',
                    name: 'atr',
                    inputValue: 'Surname'
                }]
            }, {
                xtype: 'checkboxfield',
                boxLabel: 'Должники',
                name: 'deptor',
                inputValue: '1',
                id: 'deptor',
                listeners: {
                    change: function () {
                   
                   gridReaders = Ext.getCmp('readersGrid'),
                  
                   gridReadersStore = gridReaders.store;
                        searchPersonsForm=me;
                        keyWord = searchPersonsForm.down('textfield[name=Name]').getValue();
                        attribute = searchPersonsForm.down('radiogroup[name=atribute]').getChecked()[0].inputValue;
                        debtorFlag = searchPersonsForm.down('checkboxfield[name=deptor]').getValue();
                        gridReadersStore.load(
                            { params: { keyWord: keyWord, attribute: attribute,deptorFlag:debtorFlag } },
                            function () {
                                gridReaders.getView().refresh();
                            });
            
                    }
                },
            },
            ],
            buttons: [{                         
                text: 'поиск',
                name: 'searchPerson',

 
                }
            ]

        });

        me.callParent(arguments);
    }
});