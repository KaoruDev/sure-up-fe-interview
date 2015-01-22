var app = app || {};

(function($) {

  app.VehicleView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#vehicle-template').html()),

    initialize: function() {
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

})(jQuery);