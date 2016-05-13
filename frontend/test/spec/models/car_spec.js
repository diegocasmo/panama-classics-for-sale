/*global define, beforeEach, afterEach, describe, it, sinon*/
define([
  'models/car'
],function(Car) {

  'use strict';

  beforeEach(function() {
    this.car = new Car({ title: 'foo', app: 'foo' });
  });

  afterEach(function() {
    this.car = null;
  });

  describe('Car Model', function() {

    describe('Initialization', function() {

      it('should call "#cacheSearchString"', function() {
        var spy = sinon.spy(this.car, 'cacheSearchString');
        this.car.initialize();
        expect(spy.called).to.be.true;
      });

    });

    describe('Methods', function() {

      describe('#cacheSearchString', function() {

        it('should create a "searchJSON" key', function() {
          var obj = {
            'searchString': this.car.get('title'),
            'cid': this.car.cid
          };
          this.car.cacheSearchString()
          expect(this.car.searchJSON).to.eql(obj);
        });

      });

      describe('#parse', function() {

        it('should add company seller logo location to response', function() {
          var obj = this.car.parse(this.car.toJSON());
          expect(obj.companyLogo).to.equal('img/foo.png');
        });

      });
    });
  });
});
