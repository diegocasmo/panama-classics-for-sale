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

    initialize: function() {
      var communities = [
        {
          'name': 'Autos Antiguos y Deportivos de Panamá (ADEPA)',
          'link': 'https://www.facebook.com/groups/12896319513/'
        },
        {
          'name': 'Autos Clásicos Azuero',
          'link': 'https://www.facebook.com/groups/1625110664397957/'
        },
        {
          'name': 'Clásicos y Antiguos de Panamá (CYA)',
          'link': 'https://www.facebook.com/clasicosyantiguosdepanama/?fref=ts'
        }
      ];
      this.add(communities);
    }

  });

  return Communities;

});
