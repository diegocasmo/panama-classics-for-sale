// Represents a collection of communities
/*global define*/
define([
  'backbone',
  'models/community'
], function(Backbone, Community) {

  'use strict';

  var Communities = Backbone.Collection.extend({

    model: Community,

    comparator: 'name',

    url: 'scripts/config/communities.json'

  });

  return Communities;

});
