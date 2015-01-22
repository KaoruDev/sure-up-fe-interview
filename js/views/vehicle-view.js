var app = app || {};

(function($) {

  app.VehicleView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#vehicle-template').html()),

    events: {
      "click .del": "delete",
      "click .edit": "edit",
      "click .done": "doneEditing"
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
      this.$el.removeClass('editing');
      var nickname = this.$('.nickname').val();
      var year = this.$('.year').val();
      var make = this.$('.make').val();
      var model = this.$('.model').val();

      this.model.set({nickname: nickname, year: year, make: make, model: model});
      this.model.save();
    }
  });

})(jQuery);