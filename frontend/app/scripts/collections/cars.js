// Represents a collection of cars
/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'models/car',
  'services/search_in_list'
], function($, _, Backbone, Car, SearchInList) {

  'use strict';

  var Cars = Backbone.Collection.extend({

    model: Car,

    url: 'http://api-clasicos.rhcloud.com/api/v1/cars',

    // Order by descending created at
    comparator: function(a, b) {
      return new Date(b.get('createdAt')) - new Date(a.get('createdAt'));
    },

    // Determines if app should be synced with API
    _isCached: false,

    // Determines how much time a particular sync
    // is considered to be up–to–date (5 min)
    _cacheTimeInterval: 300000,

    initialize: function() {
      this.on('sync', this._cacheFetch);
    },

    // Fetch collection from API if it hasn't been cached yet
    fetchIfNotCached: function() {
      if (!this._isCached) {
        this.fetch();
      } else {
        this.trigger('sync', this); // Simulate API response
      }
    },

    // Include company seller logo location
    parse: function(items){
      return _.each(items, function(item) {
        item.companyLogo = 'img/' + item.app + '.png';
      });
    },

    // Search models in collection according to query
    doSearch: function(query) {
      if (query && query.length > 0) {
        var list = this.map(function(m) { return m.searchJSON; }),
            results = SearchInList.search(list, query);
        if (results.length > 0) {
          var that = this;
          this.trigger('search:done', _.map(results, function(r) { return that.get(r); }));
        } else {
          this.trigger('search:empty', this);
        }
      } else {
        this.clearSearch();
      }
    },

    // Signal collection search has been cleared
    clearSearch: function() {
      this.trigger('search:clear', this);
    },

    // Caches collection sync for a particular time interval
    _cacheFetch: function() {
      this._isCached = true;
      var that = this;
      window.setTimeout(function() {
        that._isCached = false;
      }, this._cacheTimeInterval);
    }

  });

  return Cars;

});
