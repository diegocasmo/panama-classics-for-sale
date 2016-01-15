// Handles 'olx' site data parsing
var Promise   = require('promise'),
    olxConfig = require('../config/olx'),
    request   = require('request'),
    olxParser = require('../parsers/olx_parser');

// Return all parsed items from 'OLX' parse URL
exports.get = function() {
  return new Promise(function (resolve, reject) {
    request(olxConfig.parseUrl(), function(error, response, html) {
      if(error) {
        reject(error);
      } else {
        resolve(olxParser.parse(response));
      }
    });
  });
}
