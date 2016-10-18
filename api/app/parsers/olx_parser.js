// Parse response from 'OLX'
var Promise      = require('promise'),
    request      = require('request'),
    cheerio      = require('cheerio'),
    _            = require('lodash'),
    standardizer = require('../utils/standardizer'),
    olxConfig    = require('../config/olx_config');

// Return all 'OLX' parsed items from the desired URL
exports.get = function(url) {
  return new Promise(function (resolve, reject) {
    request(url, function(error, response, html) {
      if(error) {
        reject(error);
      } else {
        resolve(parseResponse(html));
      }
    });
  });
}

// Parser for 'OLX' response
function parseResponse(html) {
  var $ = cheerio.load(html),
      $list = $('.item-listing').children();
  return $list.map(function() {
            var $item = $(this),
                options = {
                  title    : $item.find('.title').text(),
                  price    : _.trim($item.find('.price').text()).replace('B/.', ''),
                  sold     : false,
                  image    : $item.find('.image').attr('data-fullimg'),
                  link     : _.trim($item.find('a').attr('href')).replace('//', ''),
                  createdAt: null,
                  app      : olxConfig.app()
                };
            return standardizer.do(options);
          }).get();
}
