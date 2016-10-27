
Ext.define('App.view.RegistrationReadersPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.registrationReaders',
    controller: 'mainPanelController',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [           
               {
                   xtype: 'container',
                   padding: '0px 0px 0px 0px',
                   items: [
                       { 
                           xtype: 'form',
                           items: [           
                       {
                           xtype: 'form',
                           name: 'personForm',
                           items: [           
                                {
                                    inputType: 'Name',
                                    xtype: 'textfield',
                                    fieldLabel: 'Имя',
                                    name: 'Name'
                                },
                                {
                                    inputType: 'Surname',
                                    xtype: 'textfield',
                                    fieldLabel: 'Фамилия',
                                    name: 'Surname'
                                },
                                {
                                    inputType: 'YearOfBirth',
                                    xtype: 'datefield',
                                    value: new Date(),
                                    fieldLabel: 'Год рождения',
                                    name: 'YearOfBirth'
                                }
                           ],
                           buttons: [{                       
                               text: 'Добавить',
                               name: 'addPerson'
                           }]
                       }
                           ]
                       }
                   ]
               }]});

        me.callParent(arguments);
    }
});
