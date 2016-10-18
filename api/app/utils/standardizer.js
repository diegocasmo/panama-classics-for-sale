// Standardize response sent to client application for any parsed endpoint
var _ = require('lodash');

exports.do = function(options) {
  return {
    title     : options.title ? _.trunc(_.trim(options.title.toLowerCase()), 30) : 'Sin título',
    price     : options.price ? _.trim(options.price).replace(/[^0-9.,]/g, '') : null,
    sold      : options.sold ? true : false,
    image     : options.image ? _.trim(options.image) : 'http://placehold.it/300x200?text=Sin+Imagen',
    link      : options.link ? _.trim(options.link) : false,
    createdAt : options.createdAt ? new Date(options.createdAt) : false,
    app       : options.app ? _.trim(options.app) : false
  }
}
