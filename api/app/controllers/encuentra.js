// Handle requests made to 'api/v1/encuentra' endpoint
var restify         = require('restify'),
    encuentraConfig = require('../config/encuentra'),
    request         = require('request'),
    parser          = require('../utils/parser');

// Return all parsed items from 'Encuentra24' parse URL
exports.get = function(req, res, next) {
  request(encuentraConfig.parseUrl(), function(error, response, html) {
    if(error) {
      next(new restify.InvalidArgumentError('Invalid Request'));
    }
    res.json(parser.encuentra(html));
  });
}
