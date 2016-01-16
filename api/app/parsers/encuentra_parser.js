// Parse response from the specified site
var cheerio         = require('cheerio'),
    _               = require('lodash'),
    moment          = require('moment'),
    standardizer    = require('../utils/standardizer'),
    encuentraConfig = require('../config/encuentra');

// Parser for 'Encuentra24' response
exports.parse = function(html) {
  var $ = cheerio.load(JSON.parse(html).listing),
      $list = $('article.ann-box-teaser');
  return $list.map(function() {
            var $item = $(this),
                options = {
                  title    : $item.find('.ann-box-title').text(),
                  price    : ($item.find('.ann-price-2nd').text()).replace('B/.', ''),
                  sold     : ($item.css('opacity')) ? true : false,
                  image    : $item.find('.lazy').attr('data-original') ? ($item.find('.lazy').attr('data-original')).replace('/small','') : null,
                  link     : encuentraConfig.baseUrl() + $item.find('.ann-box-title').attr('href'),
                  createdAt: convertCreatedAtTextToTimestamp(_.trim($item.find('.ann-box-hilight-time > span.value').text())),
                  app      : encuentraConfig.app()
                };
            return standardizer.do(options);
          }).get();
}

// Convert created at text to timestamp
function convertCreatedAtTextToTimestamp(createdAtText) {
  var regexTransform = {
        '^Hace ([0-9]+) día$'  : 'day',
        '^Hace ([0-9]+) días$' : 'days',
        '^Hace ([0-9]+) mes$'  : 'month',
        '^Hace ([0-9]+) meses$': 'months',
        '^Hace ([0-9]+) año$'  : 'year',
        '^Hace ([0-9]+) años$' : 'years'
      };
  var timeAgo = _.filter(Object.keys(regexTransform), function(regex) {
        return (createdAtText.match(new RegExp(regex)) != null);
    });
  if (_.isEmpty(timeAgo)) {
    return new Date();
  } else {
    var number   = parseInt(createdAtText.match(/[0-9]+/g)),
        timeUnit = regexTransform[timeAgo];
    return moment().subtract(number, timeUnit);
  }
}
