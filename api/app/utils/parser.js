// Parse response from the scrapped end points
var cheerio         = require('cheerio'),
    _               = require('lodash');
    standardizer    = require('./standardizer'),
    olxConfig       = require('../config/olx'),
    encuentraConfig = require('../config/encuentra');

// Parser for 'OLX' response
exports.olx = function(data) {
  var list = JSON.parse(data.body).data;
  return list.map(function(item) {
          var options = {
            title: item['title'],
            price: item['price'] ? item['price']['amount'] : false,
            sold : item['sold'],
            image: item['fullImage'],
            link : item['slug']
          };
          return standardizer.do(options);
        });
}

// Parser for 'Encuentra24' response
exports.encuentra = function(html) {
  var $ = cheerio.load(JSON.parse(html).listing),
      $list = $('article.ann-box-teaser');
  return $list.map(function() {
            var data = $(this),
                options = {
                  title: data.find('.ann-box-title').text(),
                  price: (data.find('.ann-price-2nd').text()).replace('B/.', ''),
                  sold : (data.css('opacity')) ? true : false,
                  image: data.find('.lazy').attr('data-original') ? (data.find('.lazy').attr('data-original')).replace('/small','') : null,
                  link : encuentraConfig.baseUrl() + data.find('.ann-box-title').attr('href')
                };
            return standardizer.do(options);
          }).get();
}
