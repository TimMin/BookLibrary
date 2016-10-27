Ext.define('App.controller.MainPanelController', {
    extend: 'Ext.app.Controller',
    views: ['App.view.MainPanel', 'App.view.BooksPanel', 'App.view.ReadersPanel', 'App.view.BookGrid', 'App.view.ReadersGrid', 'App.view.SearchForm', 'App.view.LogGrid'],
    models: ['App.model.Book', 'App.model.Person', 'App.model.Log'],
    stores: ['App.store.BookStore', 'App.store.PersonStore', 'App.store.LogStore'],
    init: function () {
        this.control({
            'mainPanel': {
                boxready: this.getAppData
            },
            'registrationReaders button[name=addPerson]': {
                click: this.addPerson
            },
            'registrationBook button[name=addBook]': {
                click: this.addBook
            },
            'booksPanel button[name=borrowBook]': {
                click: this.borrowBook
            },
            'booksPanel button[name=log]': {
                click: this.log
            },
            'searchForm button[name=searchBook]': {
                click: this.searchBook
            },
            'searchPersonForm button[name=searchPerson]': {
                click: this.searchPerson
            },



        });
    },

    getAppData: function (view) {
        var me = this,
            boxView = view,
            initFunction = function (response) {
                var view = boxView,
                    gridBooks = view.down('grid[name=bookGrid]'),
                    gridReaders = view.down('grid[name=readersGrid]'),
                    gridBooksStore = gridBooks.store,
                    gridReadersStore = gridReaders.store;

                gridReadersStore.load(
                    {params: {param1: 'anotherValue'}},
                    function () {
                        gridReaders.getView().refresh();
                    });
                gridBooksStore.load(function () {
                    gridBooks.getView().refresh();
                });
            };

        initFunction();
    },

    addPerson: function (view, event) {
        var me = this,
            personsForm = view.up('form[name=personForm]'),
            name = personsForm.down('textfield[name=Name]').getValue(),
            surname = personsForm.down('textfield[name=Surname]').getValue(),
            yearOfBirth = personsForm.down('datefield').getValue(),
             mainPanel = view.up('mainPanel'),
              readers = mainPanel.down('grid[name=readersGrid]'),
            readersStore = readers.store;
        succFunct = function (response) {
            readersStore.load(function () {
                readers.getView().refresh();
            });
        }

        if (name === "") {
            Ext.MessageBox.show({
                title: 'Окно ',
                msg: 'Name shoudlnt be empty',
                buttons: Ext.MessageBox.OK
            });
            return;
        }

        var personData = {
            Name: name,
            Surname: surname,
            DateOfBirth: yearOfBirth
        }

        Ext.Ajax.request
        ({
            url: 'Home/CreatePerson',
            method: 'POST',
            params: personData,
            success: function (response) {
                succFunct(response);
                console.log(response.responseText);
            },
            failure: function (response) {
                console.log(response.responseText);
            }

        });

    },

    addBook: function (view, event) {
        var me = this,
            bookForm = view.up('form[name=bookForm]'),
            mainPanel = view.up('mainPanel'),
            gridBooks = mainPanel.down('grid[name=bookGrid]'),
            gridBooksStore = gridBooks.store,
            name = bookForm.down('textfield[name=Name]').getValue(),
            author = bookForm.down('textfield[name=Author]').getValue(),
            succFunct = function (response) {
                gridBooksStore.load(function () {
                    gridBooks.getView().refresh();
                });
            }

        if (name === "") {
            Ext.MessageBox.show({
                title: 'Окно ',
                msg: 'Name shoudlnt be empty',
                buttons: Ext.MessageBox.OK
            });
            return;
        }

        var bookData = {
            Name: name,
            Author: author
        };

        Ext.Ajax.request
        ({
            url: 'Home/CreateBook',
            method: 'POST',
            params: bookData,
            success: function (response) {
                succFunct();
                console.log(response.responseText);
            },
            failure: function (response) {
                console.log(response.responseText);
            }

        });

    },
    

    searchBook: function (view, event) {
        var me = this,
            boxView = view.up().up().up(),
            gridBooks = boxView.down('grid[name=bookGrid]'),
                    gridBooksStore = gridBooks.store;               
                searchBookForm=view.up('[name=search]');
            keyWord = searchBookForm.down('textfield[name=Name]').getValue();
        attribute = searchBookForm.down('radiogroup[name=atribute]').getChecked()[0].inputValue;
        thereIs = searchBookForm.down('checkboxfield[name=thereIs]').getValue();
        
        gridBooksStore.load(
            { params: { keyWord: keyWord, attribute: attribute, thereIs: thereIs } },
        function () {
            gridBooks.getView().refresh();
        });

    },
    searchPerson: function (view, event) {
        var me = this,

                    boxView = view.up().up().up(),
                    gridReaders = boxView.down('grid[name=readersGrid]'),                    
                    gridReadersStore = gridReaders.store;
        searchPersonsForm=view.up('[name=searchPerson]');
        keyWord = searchPersonsForm.down('textfield[name=Name]').getValue();
        attribute = searchPersonsForm.down('radiogroup[name=atribute]').getChecked()[0].inputValue;
        debtorFlag = searchPersonsForm.down('checkboxfield[name=deptor]').getValue();
        gridReadersStore.load(
            { params: { keyWord: keyWord, attribute: attribute, deptorFlag: debtorFlag } },
            function () {
                gridReaders.getView().refresh();
            });

    },
    borrowBook: function (view, event) {

        var me = this,
        viewBox = view.up().up().up();
        Reader = viewBox.down('grid[name=readersGrid]').getSelectionModel().getSelection()[0];
        Book = viewBox.down('grid[name=bookGrid]').getSelectionModel().getSelection()[0];
        if (Book === undefined) {
            Ext.MessageBox.show({
                title: 'Окно ',
                msg: 'Выберите книгу',
                buttons: Ext.MessageBox.OK
            });
            return;
        }
        if (Reader === undefined) {
            Ext.MessageBox.show({
                title: 'Окно ',
                msg: 'Выберите читателя',
                buttons: Ext.MessageBox.OK
            });
            return;
        }
        var borrowBook = {
            Person: Reader.data.Id,
            Book: Book.data.Id,
        }

        Ext.Ajax.request
        ({
            url: 'Home/CreateDebt',
            method: 'POST',
            params: borrowBook,
            success: function (response) {
                var responseText = Ext.decode(response.responseText);
                if (responseText.Success) {
                    Ext.MessageBox.show({
                        title: 'Окно ',
                        msg: 'Книга выдана',
                        buttons: Ext.MessageBox.OK
                    });
                    mainPanel = view.up('mainPanel'),
            readers = mainPanel.down('grid[name=readersGrid]'),
          readersStore = readers.store;
                    readersStore.load();
                    readers.getView().refresh();
                }
                else
                    Ext.MessageBox.show({
                        title: 'Окно ',
                        msg: 'Книги в архиве нет',
                        buttons: Ext.MessageBox.OK
                    });
            },
            failure: function (response) {
                console.log(response.responseText);
            }

        });
    },
    log: function (view)
    {
        Ext.create('Ext.window.Window', {
            title: 'Журнал',
            height: 350,
            width: 550,
            layout: 'fit',
            items: {          
                     xtype: 'logGrid',
                     name: 'logGrid'
            },

        }).show();

    }
        

});

