// Main file to bootstrap application
/*global require*/
'use strict';
require.config({
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    foundation: '../../bower_components/foundation/js/foundation.min',
    'backbone-route-filter': '../../bower_components/backbone-route-filter/backbone-route-filter'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    jquery: {
      exports: '$'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone-route-filter': {
      deps: ['backbone']
    },
    foundation: {
      deps: ['jquery']
    }
  }
});

require([
  'underscore',
  'jquery',
  'routers/app_router',
  'views/app_view',
  'collections/countries',
  'collections/cars',
  'collections/communities',
  'foundation'
], function (_, $, AppRouter, AppView, Countries, Cars, Communities) {

  $(document).foundation();

  var countries = new Countries();

  $.when(countries.fetch())
    .done(function() {
      // Start application after all countries have been fetch
      var appView = new AppView({
        'countries'  : countries,
        'cars'       : new Cars(),
        'communities': new Communities()
      });
      var appRouter = new AppRouter({ 'appView': appView });
      Backbone.history.start({ pushState: false, root: '/' });
    })
    .fail(function() {
      // Show error message if there is an error on fetch
      var getErrorTemplate = function() {
        return _.template(
        '<p>La aplicación está temporalmente fuera de línea por mantenimiento. ' +
        'Por favor, vuelva a intentar en algunos minutos.</p>' +
        '<button onclick="location.reload(true); return false;">Volver a intentar</button>'
        );
      };
      $('#app-wrapper').html(getErrorTemplate());
    });
});
