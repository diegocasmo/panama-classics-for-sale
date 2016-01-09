// Standardizes response send to client application
// for any parsed endpoint
var _ = require('lodash');

exports.do = function(options) {
  return {
    title: options.title ? _.trunc(_.trim(options.title), 20) : 'Sin título',
    price: options.price ? _.trim('$' + options.price) : 'Sin precio',
    sold : options.sold  ? 'Vendido' : 'Sin vender',
    image: options.image ? _.trim(options.image) : 'http://placehold.it/300x200?text=Sin+Imagen',
    link : options.link  ? _.trim(options.link) : false
  }
}
