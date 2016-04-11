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
        },
        {
          'name': 'MOPAR Panamá',
          'link': 'https://www.facebook.com/MOPAR-PANAMA-160640714677/'
        },
        {
          'name': 'Revista Autopista Panamá',
          'link': 'https://www.facebook.com/Revista-Autopista-Panama-277900128897781/'
        },
        {
          'name': 'Club 4x4 Panamá',
          'link': 'https://www.facebook.com/groups/4x4panama/'
        },
        {
          'name': 'VW Addiction Panamá',
          'link': 'https://www.facebook.com/VW-Addiction-Panama-578406592287713/'
        },
        {
          'name': 'Fuerza Nissan Panamá',
          'link': 'https://www.facebook.com/fuerzanissanpanama/'
        }
      ];
      this.add(communities);
    }

  });

  return Communities;

});
