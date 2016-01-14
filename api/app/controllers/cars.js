// Handle requests made to 'api/v1/cars' endpoint
var restify             = require('restify'),
    Promise             = require('promise'),
    _                   = require('lodash'),
    olxController       = require('./olx'),
    encuentraController = require('./encuentra');

// Return all parsed items from the desired sites
exports.get = function(req, res, next) {
  Promise.all([
      encuentraController.get(),
      olxController.get()
    ])
    .then(function(values) {
      res.json(_.flatten(values));
    })
    .catch(function(err) {
      next(new restify.InvalidArgumentError('Invalid Request'));
    });
}
