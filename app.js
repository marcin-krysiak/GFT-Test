/**
 * Created by marcinkrysiak on 29/06/15.
 */

$(function () {

    var App = function (APPID) {

        return {
            todos: {}, //data model object
            ui: {}, //namespace for used DOM elements
            storeId : 'todos-jquery-' + APPID, //localStorage id

            //SETS UI OBJECT WITH CORRESPONDING DOM ELEMENTS
            getUi: function() {
                return {
                    $newItem: $('#todo-new-item'),
                    $addNewItem: $('#add-new-item'),
                    $todoList: $('#todo-list'),
                    todoListItems: Handlebars.compile( $('#todo-list-template').html() ),
                    deleteButton: '.delete-button',
                    $summary: $('#summary')
                }
            },

            //BINDS EVENTS
            bindEvents: function() {
                this.ui.$addNewItem.on( 'click', this.addNewItem.bind(this) );
                this.ui.$todoList.on( 'click', this.ui.deleteButton, this.deleteItem.bind(this) );
                Object.observe( this.todos, this.todosChanged.bind(this) );
            },

            //INITIALISE THE APP
            init: function () {
                this.todos = this.store();
                this.ui = this.getUi();
                this.bindEvents();
                this.render();
            },

            //RENDERS LIST OF ITEMS
            render: function() {
                this.ui.$todoList.html( this.ui.todoListItems(this.todos) );
                this.ui.$summary.text( this.todos.length + ' items in the list' );
            },

            //ADDS NEW ITEM TO THE LIST
            addNewItem: function() {
                //adds new item to store and append to list
                var taskLabel = this.ui.$newItem.val().trim(),
                    taskIndex = this.todos.indexOf(taskLabel);

                if ( taskIndex === -1 ) {
                    this.todos.push( taskLabel );
                }
                else alert('this task is already there');
            },

            //REMOVES ITEM FROM THE LIST
            deleteItem: function(e) {
                var label =  $(e.currentTarget).prev('label').text(),
                    taskIndex = this.todos.indexOf(label);

                this.todos.splice( taskIndex, 1 );
            },

            //MODEL CHANGES HANDLER
            todosChanged: function() {
                this.store( this.todos );
                this.render();
            },

            //LOCALSTORAGE DATA MANIPULATIONS
            store: function (data) {
                var namespace = this.storeId;
                if (arguments.length > 0) {
                    return localStorage.setItem( namespace, JSON.stringify(data) );
                } else {
                    var store = localStorage.getItem(namespace);
                    return (store && JSON.parse(store)) || [];
                }
            }
        }
    };

    //use with require
    //module.exports = App; 

    var app = new App(2); //create new instance of the App and pass unique storeId
    app.init(); //App initialisation
});

