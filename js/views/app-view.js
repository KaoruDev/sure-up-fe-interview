var app = app || {};

(function($) {

  app.appView = Backbone.View.extend({
    el: '#vehicles',
    events: {
      "click .add": "createEntry"
    },

    initialize: function() {
      this.$list = this.$('#entries');
      this.listenTo(app.vehicles, 'reset', this.addAll);
      this.listenTo(app.vehicles, 'add', this.addOne);
      app.vehicles.fetch({reset: true});
    },

    addOne: function(vehicle) {
      var view = new app.VehicleView({ model: vehicle });
      this.$list.append(view.render().el);
    },

    addAll: function() {
      this.$list.html('');
      app.vehicles.each(this.addOne, this);
    },

    createEntry: function() {
      var new_model = new app.Vehicle();
      var view = new app.VehicleView({model: new_model });
      view.edit();
      this.$list.append(view.render().el);
    }

  });

})(jQuery);