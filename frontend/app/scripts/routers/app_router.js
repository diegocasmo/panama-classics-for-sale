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
      this.appView       = options.appView;
      this.encuentraCars = options.encuentraCars;
      this.olxCars       = options.olxCars;
    },

    startApplication: function() {
      Backbone.history.start({
        pushState: false,
        root: '/'
      });
    },

    routes: {
      'inicio'  : 'showHome',
      'nosotros': 'showAbout',
      '*actions': 'showHome'
    },

    showHome: function() {
      this.appView.showView(new HomeLayoutView({
        encuentraCars: this.encuentraCars,
        olxCars      : this.olxCars
      }));
    },

    showAbout: function() {
      this.appView.showView(new AboutLayoutView());
    }

  });

  return AppRouter;

});
