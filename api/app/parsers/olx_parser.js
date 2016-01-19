// Parse response from 'OLX'
var Promise      = require('promise'),
    request      = require('request'),
    standardizer = require('../utils/standardizer'),
    olxConfig    = require('../config/olx_config');

// Return all 'OLX' parsed items from the desired URL
exports.get = function(url) {
  return new Promise(function (resolve, reject) {
    request(url, function(error, response, html) {
      if(error) {
        reject(error);
      } else {
        resolve(parseResponse(response));
      }
    });
  });
}

// Parser for 'OLX' response
function parseResponse(response) {
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
