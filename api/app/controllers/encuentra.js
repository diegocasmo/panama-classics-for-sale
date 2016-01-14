// Handles 'Encuentra24' data site parsing
var Promise         = require('promise'),
    encuentraConfig = require('../config/encuentra'),
    request         = require('request'),
    encuentraParser = require('../parsers/encuentra_parser');

// Return all parsed items from 'Encuentra24' parse URL
exports.get = function() {
  return new Promise(function (resolve, reject) {
    request(encuentraConfig.parseUrl(), function(error, response, html) {
      if(error)  {
        reject(error);
      } else {
        resolve(encuentraParser.parse(html));
      }
    });
  });
}
