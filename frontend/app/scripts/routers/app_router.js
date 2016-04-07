// Match routes to specific application actions
/*global define*/
define([
  'backbone',
  'views/pages/cars_page_view',
  'views/pages/communities_page_view',
  'views/pages/about_page_view'
], function(Backbone, CarsPageView, CommunitiesPageView, AboutPageView) {

  'use strict';

  var AppRouter = Backbone.Router.extend({

    initialize: function(options) {
      this.appView     = options.appView;
      this.cars        = options.cars;
      this.communities = options.communities;
    },

    startApplication: function() {
      Backbone.history.start({
        pushState: false,
        root: '/'
      });
    },

    routes: {
      'carros'     : 'showCars',
      'nosotros'   : 'showAbout',
      'comunidades': 'showCommunities',
      '*actions'   : 'showCars'
    },

    showCars: function() {
      this.appView.showView(new CarsPageView({
        'cars': this.cars
      }));
    },

    showAbout: function() {
      this.appView.showView(new AboutPageView());
    },

    showCommunities: function() {
      this.appView.showView(new CommunitiesPageView({
        'communities': this.communities
      }));
    }

  });

  return AppRouter;

});
