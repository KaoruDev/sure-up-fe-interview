var app = app || {};

(function($) {

  app.appView = Backbone.View.extend({
    el: '#vehicles',
    initialize: function() {
      this.$list = this.$('#entries');
      this.listenTo(app.vehicles, 'reset', this.addAll);
      app.vehicles.fetch({reset: true});
    },

    addOne: function(vehicle) {
      var view = new app.VehicleView({ model: vehicle });
      this.$list.append(view.render().el);
    },

    addAll: function() {
      this.$list.html('');
      app.vehicles.each(this.addOne, this);
    }
  });

})(jQuery);