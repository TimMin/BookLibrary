
Ext.define('App.view.ReadersGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.readersGrid',

    scrollable: true,
    id:'readersGrid',
    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            displayMsg: '',
            emptyMsg: '',
            store: 'App.store.PersonStore',
            dock: 'bottom',
            listeners: {
                beforechange: function () {
                    searchPersonsForm = this.up().up(),
                    keyWord = searchPersonsForm.down('textfield[name=Name]').getValue(),
                    attribute = searchPersonsForm.down('radiogroup[name=atribute]').getChecked()[0].inputValue;
                    debtorFlag = searchPersonsForm.down('checkboxfield[name=deptor]').getValue();
                    gridReadersStore = this.store,
                    Ext.apply(gridReadersStore.getProxy().extraParams, {
                        keyWord: keyWord,
                        attribute: attribute,
                        deptorFlag: debtorFlag,
                    });
                }
            },
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

                } ,               
            ],
            
          

        }
    ],

    initComponent: function () {
        var me = this;

        Ext.applyIf(me,
         {
            store: 'App.store.PersonStore',
            columns: [
            {
                text: 'Имя',
                dataIndex: 'Name'
            },
            {
                text: 'Фамилия',
                dataIndex: 'Surname'
            },
             {
                 text: 'Дата рождения',
                 type: 'date',
                 dataIndex: 'DateOfBirth',
                 format: 'd/m/Y', // <------- this way
             },
            {
                text: 'Id',
                dataIndex: 'Id'
            },],
            height: 350,
            width: 600,
            title: 'Читатели',
            id: 'grid',
            listeners: {
                itemdblclick: function (dv, record, item, index, e) {
                    view = this;
                    gridBooks = view.up().down('grid[name=readersGrid]'),
                    booksData = gridBooks.store.getAt(index).data.BooksData,
                   
                    store = Ext.create('Ext.data.Store', {
                        fields: [ 'Id' ,'Author', 'Name'],
                        data: booksData
                     });
                    Ext.create('Ext.window.Window', {
                        name:'bookWindow',
                        title: 'Hello',
                        height: 200,
                        width: 400,
                        layout: 'fit',
                        items: {  
                            xtype: 'grid',
                            border: false,
                            store: store,
                            name: 'booksGrid',
                            id: 'booksGrid',
                            columns: [
                                {
                                    text: 'Имя',
                                    dataIndex: 'Name'
                                },
                            {
                                text: 'Автор',
                                dataIndex: 'Author'
                            },
                            {
                                text: 'Id',
                                dataIndex: 'Id'
                            }],
                         
                        },
                        buttons: [{                         
                            text: 'вернуть книгу',
                            name: 'returnBook',
                            handler: function () {                                
                                viewBox = Ext.getCmp('booksGrid');
                                Book = viewBox.getSelectionModel().getSelection()[0];
                                if (Book === undefined) {
                                    Ext.MessageBox.show({
                                        title: 'Окно',
                                        msg: 'Выберите книгу',
                                        buttons: Ext.MessageBox.OK
                                    });
                                    return;
                                }

                                var borrowedBook = {
                                    Id: Book.data.Id,
                                }

                                Ext.Ajax.request
                                ({
                                    url: 'Home/DeleteDept',
                                    method: 'POST',
                                    params: borrowedBook,
                                    success: function (response) {
                                        var responseText = Ext.decode(response.responseText);
                                        if (responseText.Success) {
                                            Ext.MessageBox.show({
                                                title: 'Окно ',
                                                msg: 'Книга возвращена',
                                                buttons: Ext.MessageBox.OK
                                            });
                                            mainPanel = view.up('mainPanel'),
                                            readers = mainPanel.down('grid[name=readersGrid]'),
                                            readersStore = readers.store;
                                            readersStore.load();
                                            readers.getView().refresh();
                                            
                                        }
                    
                                    },
                                    failure: function (response) {
                                        console.log(response.responseText);
                                    }

                                });

                            }
                        }]
                    }).show();
                }
            },
           
        });

        me.callParent(arguments);
    }
});