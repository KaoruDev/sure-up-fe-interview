var app = app || {};

(function($) {

  app.appView = Backbone.View.extend({
    el: '#vehicles',
    events: {
      "click .add": "createEntry"
    },

    initialize: function() {
      this.$list = this.$('#entries'); // this is the list of vehicles: no header/footer included
      this.listenTo(app.vehicles, 'reset', this.addAll);
      this.listenTo(app.vehicles, 'add', this.addOne);
      app.vehicles.fetch({reset: true}); // on the initial load, grab the data from the server
    },

    addOne: function(vehicle) {
      var view = new app.VehicleView({ model: vehicle });
      this.$list.append(view.render().el);
    },

    addAll: function() {
      this.$list.html(''); // if we're adding everything we want to reset, so neuter the HTML
      app.vehicles.each(this.addOne, this);
    },

    createEntry: function() {
      var new_model = new app.Vehicle();
      var view = new app.VehicleView({ model: new_model });
      // immediately put view into editing mode since it's a new model, but do it before we append
      view.edit();
      this.$list.append(view.render().el);
    }

  });

})(jQuery);