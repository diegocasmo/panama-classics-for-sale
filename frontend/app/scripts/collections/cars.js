// Represents a collection of cars
/*global define*/
define([
  'underscore',
  'backbone',
  'models/app_state',
  'models/car',
  'services/search_in_list'
], function(_, Backbone, AppState, Car, SearchInList) {

  'use strict';

  var Cars = Backbone.Collection.extend({

    model: Car,

    url: function() {
      var country = AppState.get().country();
      var countrySlug = country.apiSlug ? 'countrySlug=' + country.apiSlug : '';
      var domainExt = country.apiDomainExt ? 'domainExt=' + country.apiDomainExt : '';
      var queryString = '?' + countrySlug + '&' + domainExt;
      return 'http://api-clasicos.rhcloud.com/api/v1/cars' + queryString;
    },

    // Order by descending created at
    comparator: function(a, b) {
      return new Date(b.get('createdAt')) - new Date(a.get('createdAt'));
    },

    // Search models in collection according to query
    doSearch: function(query) {
      if (query && query.length > 0) {
        var that = this,
            list = this.map(function(m) { return m.searchJSON; }),
            results = SearchInList.search(list, query);
        this.trigger('search:done', _.map(results, function(r) { return that.get(r); }));
      } else {
        this.clearSearch();
      }
    },

    // Signal collection search has been cleared
    clearSearch: function() {
      this.trigger('search:clear', this);
    }

  });

  return Cars;

});
