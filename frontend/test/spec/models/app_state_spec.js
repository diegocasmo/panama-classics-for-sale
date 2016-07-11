/*global define, beforeEach, afterEach, describe, it*/
define([
  'models/app_state'
],function(AppState) {

  'use strict';

  beforeEach(function() {
    this.appState = AppState.get();
  });

  afterEach(function() {
    this.appState = null;
  });

  describe('App State Model', function() {

    describe('Initialization', function() {

      it('should have correct defaults', function() {
        expect(this.appState.defaults.country).to.eql({});
      });

    });
    describe('Methods', function() {

      describe('#setCountry', function() {

        it('should set "country" attr to model JSON passed to it', function() {
          var obj = { 'test': 'foo' };
          this.appState.setCountry(new Backbone.Model(obj));
          expect(this.appState.get('country')).to.eql(obj);
        });

      });

      describe('#country', function() {

        it('should return "country" attr value', function() {
          var obj = { 'test': 'hello' };
          this.appState.set('country', obj);
          expect(this.appState.country()).to.eql(obj);
        });

      });
    });
  });
});
