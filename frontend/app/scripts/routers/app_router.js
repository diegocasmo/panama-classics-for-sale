// Match routes to specific app view methods
/*global define*/
define([
  'backbone',
  'backbone-route-filter'
], function(Backbone) {

  'use strict';

  var AppRouter = Backbone.Router.extend({

    routes: {
      'paises'                  : 'showCountries',
      'carros/:countrySlug'     : 'showCars',
      'nosotros'                : 'showAbout',
      'comunidades/:countrySlug': 'showCommunities',
      '*actions'                : 'showCountries'
    },

    before: {
      'carros/:countrySlug'     : 'setCurrentCountry',
      'comunidades/:countrySlug': 'setCurrentCountry'
    },

    initialize: function(options) {
      this.appView     = options.appView;
    },

    showCountries: function() {
      this.appView.showCountriesPage();
    },

    showCars: function() {
      this.appView.showCarsPage();
    },

    showAbout: function() {
      this.appView.showAboutPage();
    },

    showCommunities: function() {
      this.appView.showCommunitiesPage();
    },

    // Helper methods
    setCurrentCountry: function(fragment, args, next) {
      var countrySlug = _.first(args);
      if(this.appView.setAsCurrentCountry(countrySlug)) {
        next();
      } else {
        this.navigate('paises', { trigger: true });
      }
    }

  });

  return AppRouter;

});
