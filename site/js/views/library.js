var app = app || {};

app.LibraryView = Backbone.View.extend({
    el: '#books',

    events:{
    'click #add':'addBook'
},

addBook: function( e ) {
    //preventDefault() prevents the form from submitting and reloading the page
    e.preventDefault();

    var formData = {};

    //We select all the input elements of the form that have a value and iterate over them using jQuery’s each.

    $( '#addBook div' ).children( 'input' ).each( function( i, el ) {
        if( $( el ).val() != '' )
        {
            //Since we used the same names for ids in our form as 
            //the keys on our Book model we can simply store them directly in the formData object
            formData[ el.id ] = $( el ).val();
        }
    });

    this.collection.add( new app.Book( formData ) );
    //still need to re-render the view since the collection has been updated
},
//Note that in the initialize function we accept an array of data that we pass to the app.Library constructor. 
//We’ll use this to populate our collection with some sample data so that we can see everything is 
//working correctly.
    initialize: function( initialBooks ) {

       //When creating a Collection, you may choose to pass in the initial array of models.
        this.collection = new app.Library( initialBooks );
        this.render();

        this.listenTo( this.collection, 'add', this.renderBook );
        
        
    },

    // render library by rendering each book in its collection
    render: function() {
        //each() is an underscore iterator method for looping over objects in a collection
        this.collection.each(function( item ) {
            this.renderBook( item );
        }, this );
        //The iterator is bound to the context object, if one is passed. (this)
    },

    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderBook: function( item ) {
        var bookView = new app.BookView({
            model: item
        });
        this.$el.append( bookView.render().el );
    }
});