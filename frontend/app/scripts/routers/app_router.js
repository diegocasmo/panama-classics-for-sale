// Match routes to specific application actions
/*global define*/
define([
  'jquery',
  'backbone',
  'views/layouts/home_layout_view',
  'views/layouts/about_layout_view'
], function($, Backbone, HomeLayoutView, AboutLayoutView) {

  'use strict';

  var AppRouter = Backbone.Router.extend({

    initialize: function(options) {
      this.appView = options.appView;
      this.cars    = options.cars;
    },

    startApplication: function() {
      Backbone.history.start({
        pushState: false,
        root: '/'
      });
    },

    routes: {
      'carros'  : 'showCars',
      'nosotros': 'showAbout',
      '*actions': 'showCars'
    },

    showCars: function() {
      this.appView.showView(new HomeLayoutView({
        cars: this.cars
      }));
    },

    showAbout: function() {
      this.appView.showView(new AboutLayoutView());
    }

  });

  return AppRouter;

});
