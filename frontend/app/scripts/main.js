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
  'foundation'
], function ($, Backbone, AppRouter, AppView, Cars) {

  $(document).foundation();

  var appRouter = new AppRouter({
    appView: new AppView(),
    cars   : new Cars()
  });

  appRouter.startApplication();

});
