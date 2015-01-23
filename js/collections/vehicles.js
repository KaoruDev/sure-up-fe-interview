var app = app || {};

(function () {

  var Vehicles = Backbone.Collection.extend({
    model: app.Vehicle,

    url: function() {
      // collection always at the /vehicles.json endpoint
      return app.SERVER_URL + '/vehicles.json?api_key=' + app.API_KEY;
    }
  });

  app.vehicles = new Vehicles(); // make a new vehicle collection, put it in the global state

})();