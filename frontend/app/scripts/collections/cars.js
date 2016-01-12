// Represents a collection of cars
/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'models/car',
  'config/config'
], function($, _, Backbone, Car, config) {

  'use strict';

  var Cars = Backbone.Collection.extend({

    model: Car,

    url: function() {
      return config.apiEndPoint + this.routePath;
    },

    initialize: function(options) {
      this.routePath = options.routePath;
    }

  });

  return Cars;

});
