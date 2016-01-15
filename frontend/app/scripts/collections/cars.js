// Represents a collection of cars
/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'models/car'
], function($, _, Backbone, Car) {

  'use strict';

  var Cars = Backbone.Collection.extend({

    model: Car,

    url: 'http://api-clasicos.rhcloud.com/api/v1/cars',

    // Determines if app should be synced with API
    _isCached: false,

    // Determines how much time a particular sync
    // is considered to be up–to–date
    _cacheTimeInterval: 60000,

    initialize: function() {
      this.on('sync', this._cacheFetch);
    },

    // Fetch collection from API if it hasn't been cached yet
    fetchIfNotCached: function() {
      if (!this._isCached) {
        this.fetch();
      } else {
        this.trigger('sync'); // Simulate API response
      }
    },

    // Include company seller logo location
    parse: function(items){
      return _.each(items, function(item) {
        item.companyLogo = 'img/' + item.app + '.png';
      });
    },

    // Caches collection sync for a particular
    // time interval
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
