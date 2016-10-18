// 'OLX' configuration variables
exports.baseUrl = function() {
  return 'http://www.olx.com.pa';
}

exports.carsParseUrl = function(domainExt) {
  return 'http://www.olx.' + domainExt + '/nf/autos-cat-378/-year__1980';
}

exports.app = function() {
  return 'olx';
}
