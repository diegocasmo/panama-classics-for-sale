// Parse response from the specified site
var standardizer = require('../utils/standardizer'),
    olxConfig    = require('../config/olx');

// Parser for 'OLX' response
exports.parse = function(response) {
  var list = JSON.parse(response.body).data;
  return list.map(function(item) {
          var options = {
            title     : item.title,
            price     : item.price ? item.price.amount : false,
            sold      : item.sold,
            image     : item.fullImage,
            link      : item.slug,
            createdAt : item.date ? item.date.timestamp : false,
            app       : olxConfig.app()
          };
          return standardizer.do(options);
        });
}
