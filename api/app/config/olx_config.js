// 'OLX' configuration variables
exports.baseUrl = function() {
  return 'http://www.olx.com.pa';
}

exports.carsParseUrl = function() {
  return 'http://api-v2.olx.com/items?pageSize=50&location=ciudaddepanama.olx.com.pa&offset=0&categoryId=378&abundance=true&seo=true&languageId=10&f.year=TO1985';
}

exports.app = function() {
  return 'olx';
}
