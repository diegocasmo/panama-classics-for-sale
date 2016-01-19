// Handle requests made to 'api/v1/cars' endpoint
var restify         = require('restify'),
    Promise         = require('promise'),
    _               = require('lodash'),
    olxConfig       = require('../config/olx_config'),
    olxParser       = require('../parsers/olx_parser');
    encuentraConfig = require('../config/encuentra_config'),
    encuentraParser = require('../parsers/encuentra_parser');

// Return all parsed items from the desired sites
exports.get = function(req, res, next) {
  Promise.all([
      encuentraParser.get(encuentraConfig.carsParseUrl()),
      olxParser.get(olxConfig.carsParseUrl())
    ])
    .then(function(values) {
      res.json(_.flatten(values));
    })
    .catch(function(err) {
      next(new restify.InvalidArgumentError('Invalid Request'));
    });
}
