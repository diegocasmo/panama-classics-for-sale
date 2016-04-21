// Match routes to specific application actions
/*global define*/
define([
  'backbone',
  'models/app_state',
  'views/pages/countries_page_view',
  'views/pages/cars_page_view',
  'views/pages/communities_page_view',
  'views/pages/about_page_view',
  'backbone-route-filter'
], function(Backbone, AppState, CountriesPageView, CarsPageView,
  CommunitiesPageView, AboutPageView) {

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
      this.cars        = options.cars;
      this.communities = options.communities;
      this.countries   = options.countries;
    },

    showCountries: function() {
      this.appView.showView(new CountriesPageView({
        'countries': this.countries
      }));
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
    },

    // Helper methods
    setCurrentCountry: function(fragment, args, next) {
      var countrySlug = _.first(args),
          country = this.countries.findWhere({ 'slug': countrySlug });
      if(country) {
        AppState.get().setCountry(country);
        next();
      } else {
        this.navigate('paises', { trigger: true });
      }
    }

  });

  return AppRouter;

});
