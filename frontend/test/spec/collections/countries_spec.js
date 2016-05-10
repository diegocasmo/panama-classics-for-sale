/*global define, beforeEach, afterEach, describe, it*/
define([
  'collections/countries',
  'models/country'
],function(Countries, Country) {

  'use strict';

  beforeEach(function() {
    this.countries = new Countries();
  });

  afterEach(function() {
    this.countries = null;
  });

  describe('Countries Collection', function() {

    describe('Initialization', function() {

      it('should have correct model', function() {
        expect(new this.countries.model() instanceof Country).to.be.true;
      });

      it('should have correct comparator', function() {
        expect(this.countries.comparator).to.equal('name');
      });

      it('should point to correct url', function() {
        expect(this.countries.url).to.equal('/config/countries.json');
      });

    });
  });
});
