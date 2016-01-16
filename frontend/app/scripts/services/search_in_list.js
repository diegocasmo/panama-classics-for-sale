// Service module to search a particular query in a list
/*global define*/
define([], function() {

  'use strict';

  var SearchInList = {

    // Search a query in a particular list of objects
    // Each object must follow this format:
    // {
    //   'searchJSON': 'string to search in',
    //   'cid'       : 'unique object identifier'
    // }
    // This method will only return each unique object
    // identifier sorted according to search rank results
    search: function(list, query) {
      query = query.replace(' ', '|');

      var pattern = new RegExp(query, 'ig'),
          scoredList = list.map(function(obj) {
            return {
              // Assign a score to this object in the list
              score: (obj.searchString.match(pattern)) ? obj.searchString.match(pattern).length : -1,
              cid: obj.cid
            };
          });

      return this._sortResults(scoredList);
    },

    // Sort results according to their rank
    _sortResults: function(results) {
      return results
              // Filter by results with a score higher than zero
              .filter(function(obj) { return obj.score > 0; })
              // Sort in descending order
              .sort(function(a, b) { return b.score - a.score; })
              // Map by result unique identifier
              .map(function(obj) { return obj.cid; });
    }

  };

  return SearchInList;

});
