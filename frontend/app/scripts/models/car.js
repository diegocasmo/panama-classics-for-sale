// Represents a single car item
/*global define*/
define([ 'backbone' ], function(Backbone) {

  'use strict';

  var Car = Backbone.Model.extend({

    initialize: function() {
      this.cacheSearchString();
    },

    cacheSearchString: function() {
      this.searchJSON = {
        'searchString': this.get('title'),
        'cid': this.cid
      };
    },

    // Include company seller logo location
    parse: function(response)  {
      response.companyLogo = 'img/' + response.app + '.png';
      return response;
    }

  });

  return Car;

});
