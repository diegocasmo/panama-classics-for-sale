/*global define, beforeEach, afterEach, describe, it, sinon*/
define([
  'collections/cars',
  'models/car',
  'models/app_state'
],function(Cars, Car, AppState) {

  'use strict';

  beforeEach(function() {
    this.cars = new Cars();
  });

  afterEach(function() {
    this.cars = null;
  });

  describe('Cars Collection', function() {

    describe('Initialization', function() {

      it('should have correct model', function() {
        expect(new this.cars.model() instanceof Car).to.be.true;
      });

      it('should point to correct url', function() {
        sinon.stub(AppState.get(), 'country').returns({
          apiSlug: 'foo1',
          apiDomainExt: 'foo2'
        });
        expect(this.cars.url()).to.equal('http://api-clasicos.rhcloud.com/api/v1/cars?countrySlug=foo1&domainExt=foo2');
      });

    });

    describe('Methods', function() {

      describe('#comparator', function() {

        it('should return model by descending "createdAt"', function() {
          var monday = new Backbone.Model({ 'createdAt': new Date(2016, 1, 1) }),
              tuesday = new Backbone.Model({ 'createdAt': new Date(2016, 1, 2) });
          expect(this.cars.comparator(monday, tuesday)).greaterThan(0);
        });

      });

      describe('#doSearch', function() {

        describe('when there is a match', function() {

          it('should trigger "search:done" and return all matching models', function() {
            var car1 = { 'title': 'car title' },
                car2 = { 'title': 'car title' },
                car3 = { 'title': 'no sense title' },
                spy = sinon.spy();
            this.cars.on('search:done', function(results) { spy(results); });
            this.cars.add([car1, car2, car3]);
            this.cars.doSearch('car');
            expect(spy.calledWith(this.cars.first(2))).to.be.true;
          });

        });

        describe('when there is not a match', function() {

          it('should trigger "search:done" and return an empty array', function() {
            var spy = sinon.spy();
            this.cars.on('search:done', function(results) { spy(results); });
            this.cars.add({ 'title': 'car title' });
            this.cars.doSearch('foo');
            expect(spy.calledWith([])).to.be.true;
          });

        });

      });

      describe('#clearSearch', function() {

        it('should trigger "search:clear" and return collection', function() {
          var spy = sinon.spy();
          this.cars.on('search:clear', function(results) { spy(results); });
          this.cars.clearSearch();
          expect(spy.calledWith(this.cars)).to.be.true;
        });

      });
    });
  });
});
