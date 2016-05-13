/*global define, beforeEach, afterEach, describe, it*/
define([
  'collections/communities',
  'models/community'
],function(Communities, Community) {

  'use strict';

  beforeEach(function() {
    this.communities = new Communities();
  });

  afterEach(function() {
    this.communities = null;
  });

  describe('Communities Collection', function() {

    describe('Initialization', function() {

      it('should have correct model', function() {
        expect(new this.communities.model() instanceof Community).to.be.true;
      });

      it('should have correct comparator', function() {
        expect(this.communities.comparator).to.equal('name');
      });

      it('should point to correct url', function() {
        expect(this.communities.url).to.equal('/config/communities.json');
      });

    });
  });
});
