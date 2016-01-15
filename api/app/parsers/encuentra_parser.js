// Parse response from the specified site
var cheerio         = require('cheerio'),
    standardizer    = require('../utils/standardizer'),
    encuentraConfig = require('../config/encuentra');

// Parser for 'Encuentra24' response
exports.parse = function(html) {
  var $ = cheerio.load(JSON.parse(html).listing),
      $list = $('article.ann-box-teaser');
  return $list.map(function() {
            var $item = $(this),
                options = {
                  title: $item.find('.ann-box-title').text(),
                  price: ($item.find('.ann-price-2nd').text()).replace('B/.', ''),
                  sold : ($item.css('opacity')) ? true : false,
                  image: $item.find('.lazy').attr('data-original') ? ($item.find('.lazy').attr('data-original')).replace('/small','') : null,
                  link : encuentraConfig.baseUrl() + $item.find('.ann-box-title').attr('href'),
                  app  : encuentraConfig.app()

                };
            return standardizer.do(options);
          }).get();
}
