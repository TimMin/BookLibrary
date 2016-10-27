
Ext.define('App.view.RegistrationBookPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.registrationBook',
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
                   padding: '0px 0px 25px 0px',
                   items: [
                       {
                           xtype: 'form',
                           items: [
                       {
                           xtype: 'form',
                           name: 'bookForm',
                           items: [
                                  {
                                      xtype: 'textfield',
                                      fieldLabel: 'Название',
                                      name: 'Name',
                                      inputType: 'Name'
                                  },
                                  {
                                      xtype: 'textfield',
                                      name: 'Author',
                                      fieldLabel: 'Автор',
                                      inputType: 'Author'
                                  }],
                           buttons: [{
                               text: 'Добавить',
                               name: 'addBook'
                           }]
                       }
                           ]
                       }
                   ]
               }]
        });

        me.callParent(arguments);
    }
});

