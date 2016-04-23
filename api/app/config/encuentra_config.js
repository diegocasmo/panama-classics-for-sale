// 'Encuentra24' configuration variables
exports.baseUrl = function() {
  return 'http://www.encuentra24.com';
}

exports.carsParseUrl = function(countrySlug) {
  return 'http://www.encuentra24.com/' + countrySlug + '/ajax/autos-usados?isajax=1&search=f_year.-1975|number.50&page=1';
}

exports.app = function() {
  return 'encuentra';
}
