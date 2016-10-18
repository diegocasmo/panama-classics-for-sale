// 'OLX' configuration variables
exports.baseUrl = function() {
  return 'http://www.olx.com.pa';
}

exports.carsParseUrl = function(domainExt) {
  return 'http://api-v2.olx.com/items?pageSize=50&location=www.olx.' + domainExt + '&offset=0&categoryId=378&abundance=true&seo=true&languageId=10&f.year=TO1975';
}

exports.app = function() {
  return 'olx';
}
