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
      // if it's new, the only option is to create, which means we use the /vehicles.json endpoint
      if (this.isNew()) return app.SERVER_URL + '/vehicles.json?api_key=' + app.API_KEY;

      // otherwise, we use the /vehicles/{id}.json endpoint
      return app.SERVER_URL + base + encodeURIComponent(this.id) + ".json" + "?api_key=" + app.API_KEY;
    },

    /* COPIED FROM BACKBONE SOURCE, WITH MINOR ADJUSTMENTS */
    sync: function(method, model, options) {
      var noXhrPatch =
        typeof window !== 'undefined' && !!window.ActiveXObject &&
          !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);
      var methodMap = {
        'create': 'POST',
        'update': 'PUT',
        'patch':  'PATCH',
        'delete': 'DELETE',
        'read':   'GET'
      };
      var type = methodMap[method];

      // Default options, unless specified.
      _.defaults(options || (options = {}), {
        emulateHTTP: Backbone.emulateHTTP,
        emulateJSON: Backbone.emulateJSON
      });

      // Default JSON-request options.
      var params = {type: type, dataType: 'json'};

      // Ensure that we have a URL.
      if (!options.url) {
        params.url = _.result(model, 'url') || urlError();
      }

      // Ensure that we have the appropriate request data.
      if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
        params.contentType = 'application/json';
        // CHANGED HERE to account for formatting (wrapping vehicles property around JSON) */
        var json_data = { vehicles: model.toJSON(options) };
        params.data = JSON.stringify(json_data);
        // END CHANGES
      }

      // For older servers, emulate JSON by encoding the request into an HTML-form.
      if (options.emulateJSON) {
        params.contentType = 'application/x-www-form-urlencoded';
        params.data = params.data ? {model: params.data} : {};
      }

      // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
      // And an `X-HTTP-Method-Override` header.
      if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
        params.type = 'POST';
        if (options.emulateJSON) params.data._method = type;
        var beforeSend = options.beforeSend;
        options.beforeSend = function(xhr) {
          xhr.setRequestHeader('X-HTTP-Method-Override', type);
          if (beforeSend) return beforeSend.apply(this, arguments);
        };
      }

      // Don't process data on a non-GET request.
      if (params.type !== 'GET' && !options.emulateJSON) {
        params.processData = false;
      }

      // Pass along `textStatus` and `errorThrown` from jQuery.
      var error = options.error;
      options.error = function(xhr, textStatus, errorThrown) {
        options.textStatus = textStatus;
        options.errorThrown = errorThrown;
        if (error) error.apply(this, arguments);
      };

      // Make the request, allowing the user to override any Ajax options.
      var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
      model.trigger('request', model, xhr, options);
      return xhr;
    }
  });

})();