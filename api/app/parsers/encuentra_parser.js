// Parse response from 'Encuentra24'
var Promise         = require('promise'),
    request         = require('request'),
    cheerio         = require('cheerio'),
    _               = require('lodash'),
    moment          = require('moment'),
    standardizer    = require('../utils/standardizer'),
    encuentraConfig = require('../config/encuentra_config');

// Return all 'Encuentra24' parsed items from the desired URL
exports.get = function(parseUrl) {
  return new Promise(function (resolve, reject) {
    request(parseUrl, function(error, response, html) {
      if(error)  {
        reject(error);
      } else {
        resolve(parseResponse(html));
      }
    });
  });
}

// Parser for 'Encuentra24' response
function parseResponse(html) {
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
