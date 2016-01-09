// Handle requests made to 'api/v1/olx' endpoint
var restify   = require('restify'),
    olxConfig = require('../config/olx'),
    request   = require('request'),
    parser    = require('../utils/parser');

// Return all parsed items from 'OLX' parse URL
exports.get = function(req, res, next) {
  request(olxConfig.parseUrl(), function(error, response, html) {
    if(error) {
      next(new restify.InvalidArgumentError('Invalid Request'));
    }
    res.json(parser.olx(response));
  });
}
