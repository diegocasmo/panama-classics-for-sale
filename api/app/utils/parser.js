// Parse response from the scrapped end points
var cheerio         = require('cheerio'),
    standardizer    = require('./standardizer'),
    olxConfig       = require('../config/olx'),
    encuentraConfig = require('../config/encuentra');

// Parser for 'OLX' response
exports.olx = function(response) {
  var list = JSON.parse(response.body).data;
  return list.map(function(item) {
          var options = {
            title: item.title,
            price: item.price ? item.price.amount : false,
            sold : item.sold,
            image: item.fullImage,
            link : item.slug
          };
          return standardizer.do(options);
        });
}

// Parser for 'Encuentra24' response
exports.encuentra = function(html) {
  var $ = cheerio.load(JSON.parse(html).listing),
      $list = $('article.ann-box-teaser');
  return $list.map(function() {
            var $item = $(this),
                options = {
                  title: $item.find('.ann-box-title').text(),
                  price: ($item.find('.ann-price-2nd').text()).replace('B/.', ''),
                  sold : ($item.css('opacity')) ? true : false,
                  image: $item.find('.lazy').attr('data-original') ? ($item.find('.lazy').attr('data-original')).replace('/small','') : null,
                  link : encuentraConfig.baseUrl() + $item.find('.ann-box-title').attr('href')
                };
            return standardizer.do(options);
          }).get();
}
