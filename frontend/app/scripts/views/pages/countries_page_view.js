// Renders application countries page views
/*global define*/
define([
  'views/base_page',
  'views/shared/logo_show',
  'views/shared/navigation_view',
  'views/shared/message_view',
  'views/country/country_index'
], function(BasePage, LogoShow, NavigationView,
  MessageView, CountryIndex) {

  'use strict';

  var CountriesPageView = BasePage.extend({

    className: 'countries-page',

    getViewsToRender: function() {
      return [
        new LogoShow(),
        new NavigationView(),
        new MessageView({ message: 'Por favor, selecciona un país ' +
          'para busar carros clásicos:' }),
        new CountryIndex({ 'countries': this.countries })
      ];
    },

    initialize: function(options) {
      this.countries = options.countries;
    }

  });

  return CountriesPageView;

});
