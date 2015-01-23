var app = app || {};

(function($) {

  app.VehicleView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#vehicle-template').html()), // compile the template

    events: {
      "click .del": "delete",
      "click .edit": "edit",
      "click .done": "doneEditing",
      "keypress input": "doneOnEnter"
    },


    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    delete: function() {
      if(confirm("Are you sure you want to delete this entry?")) {
          this.model.destroy();
          this.remove();
      }
    },

    edit: function() {
      this.$el.addClass('editing');
    },

    doneEditing: function() {
      // grab all of the data from the form
      var nickname = this.$('.nickname').val();
      var year = this.$('.year').val();
      var make = this.$('.make').val();
      var model = this.$('.model').val();

      // update the model, and change the status
      this.model.set({nickname: nickname, year: year, make: make, model: model});
      this.model.save();
      this.$el.removeClass('editing');

    },

    doneOnEnter: function(e) {
      if(e.which == 13) { // enter key
        this.doneEditing();
      }
    }
  });

})(jQuery);