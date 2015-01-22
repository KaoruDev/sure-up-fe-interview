var app = app || {};

(function () {
  app.Vehicle = Backbone.Model.extend({
    defaults: {
      nickname:'',
      year: '',
      make: '',
      model: ''
    },

    url: function() {
      var base = '/vehicles/';
      if (this.isNew()) return base;
      return app.SERVER_URL + base + encodeURIComponent(this.id) + ".json" + "?api_key=" + app.API_KEY;
    }
  });
})();