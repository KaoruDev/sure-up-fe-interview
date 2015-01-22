var app = app || {};

(function () {

  var Vehicles = Backbone.Collection.extend({
    model: app.Vehicle,

    url: function() {
      return app.SERVER_URL + '/vehicles.json?api_key=' + app.API_KEY;
    }
  });

  app.vehicles = new Vehicles();

})();