// Renders a list of countries
/*global define*/
define([
  'views/base_view',
  'views/country/country_show'
], function(BaseView, CountryShow) {

  'use strict';

  var CountryIndex = BaseView.extend({

    tagName: 'ul',

    className: 'country-index',

    initialize: function(options) {
      this.countries = options.countries;
    },

    render: function() {
      var that = this;
      var countryIndex = this.countries.map(function(country) {
        var countryShow = new CountryShow({
          'country': country.toJSON()
        });
        that.subViews.push(countryShow);
        return countryShow.render().el;
      });
      this.$el.append(countryIndex);
      return this;
    }

  });

  return CountryIndex;

});
