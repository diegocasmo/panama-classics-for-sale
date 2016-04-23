// Represents a collection of countries
/*global define*/
define([
  'backbone',
  'models/country'
], function(Backbone, Community) {

  'use strict';

  var Countries = Backbone.Collection.extend({

    model: Community,

    comparator: 'name',

    url: '/config/countries.json'

  });

  return Countries;

});
