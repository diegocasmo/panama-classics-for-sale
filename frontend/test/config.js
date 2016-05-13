/*global require*/
require.config({
  baseUrl: '/scripts',
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    mocha: '../bower_components/mocha/mocha',
    chai: '../bower_components/chai/chai',
    sinon: '../bower_components/sinonjs/sinon'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    jquery: {
      exports: '$'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    mocha: {
      exports: 'mocha'
    },
    chai: {
      exports: 'chai'
    }
  }
});

/*global mocha*/
require([
  'mocha',
  'chai',
  'sinon'
], function(mocha, chai, sinon) {
  // Set up
  expect = chai.expect;
  assert = chai.assert;
  mocha.setup('bdd');

  // Specs to be tested
  var specs = [];

  // Collections
  specs.push('../spec/collections/cars_spec');
  specs.push('../spec/collections/communities_spec');
  specs.push('../spec/collections/countries_spec');

  // Models
  specs.push('../spec/models/app_state_spec');
  specs.push('../spec/models/car_spec');

  require(specs, function() {
    mocha.run();
  });

});
