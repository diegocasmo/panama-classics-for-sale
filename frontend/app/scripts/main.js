// Main file to bootstrap application
/*global require*/
'use strict';
require.config({
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    foundation: '../../bower_components/foundation/js/foundation.min'
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
    foundation: {
      deps: ['jquery']
    }
  }
});

require([
  'jquery',
  'backbone',
  'routers/app_router',
  'views/app_view',
  'collections/cars',
  'config/config',
  'foundation'
], function ($, Backbone, AppRouter, AppView, Cars, config) {

  $(document).foundation();

  var appRouter = new AppRouter({
    appView      : new AppView(),
    encuentraCars: new Cars({ routePath: config.encuentraRoutePath }),
    olxCars      : new Cars({ routePath: config.olxRoutePath })
  });

  appRouter.startApplication();

});
