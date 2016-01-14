// Define basic functionality which
// application views share among them
/*global define*/
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  'use strict';

  var BaseView = Backbone.View.extend({

    subViews: [],

    _removeChildViews: function() {
      _.each(this.subViews, function(childView) {
        childView.remove();
      });
      this.remove();
    }

  });

  return BaseView;

});
