// Represents application state
/*global define*/
define([
  'backbone'
], function(Backbone) {

  'use strict';

  var AppState = Backbone.Model.extend({

    defaults: {
      'country': {}
    },

    setCountry: function(country) {
      this.set('country', country.toJSON());
    },

    country: function() {
      return this.get('country');
    }

  }, {

    singleton: null,

    get: function() {
      AppState.singleton = AppState.singleton || new AppState();
      return AppState.singleton;
    }

  });

  return AppState;

});
