// Represents a single car item
/*global define*/
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  'use strict';

  var Car = Backbone.Model.extend({

    initialize: function() {
      this.cacheSearchString();
    },

    cacheSearchString: function() {
      this.searchJSON = {
        searchString: this.get('title'),
        cid: this.cid
      };
    }

  });

  return Car;

});
