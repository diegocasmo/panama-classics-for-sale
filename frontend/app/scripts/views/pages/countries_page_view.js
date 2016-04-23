// Renders application countries page views
/*global define*/
define([
  'views/base_page',
  'views/country/country_index',
  'views/shared/navigation_view'
], function(BasePage, CountryIndex, NavigationView) {

  'use strict';

  var CountriesPageView = BasePage.extend({

    className: 'countries-page',

    template: _.template(
      '<img class="logo" src="img/logo.png" />' +
      '<p>Por favor, selecciona un país para ' +
      'busar carros clásicos:</p>'
    ),

    getViewsToRender: function() {
      return [
        new NavigationView(),
        new CountryIndex({ 'countries': this.countries })
      ];
    },

    initialize: function(options) {
      this.countries = options.countries;
    }

  });

  return CountriesPageView;

});
