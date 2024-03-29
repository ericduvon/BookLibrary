var app = app || {};

app.BookView = Backbone.View.extend({
    tagName: 'div',
    className: 'bookContainer',
    template: _.template( $( '#bookTemplate' ).html() ),

    //div with class of bookContainer wraps around the template code
    //example output
 	//<div class="bookContainer">

    //	<img src="<%= coverImage %>"/>
    //	<ul>
    //	    <li><%= title %></li>
    //	    <li><%= author %></li>
    //	    <li><%= releaseDate %></li>
    //	    <li><%= keywords %></li>
    //	</ul>
	
    //  <button class="delete">Delete</button>
	//</div>

	events: {
        'click .delete': 'deleteBook'
    },

    deleteBook: function() {
        //Delete model
        this.model.destroy();

        //Delete view
        this.remove();
    },

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ) );

        return this;
    }
});