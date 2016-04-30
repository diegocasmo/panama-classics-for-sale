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

    constructor: function(options) {
      this.subViews = [];
      Backbone.View.apply(this, [options]);
    },

    removeChildViews: function() {
      _.each(this.subViews, function(v) {
        if (typeof v.removeChildViews === 'function') {
          v.removeChildViews();
        } else {
          v.remove();
        }
      });
      this.subViews = [];
      this.remove();
    },

    scrollToTop: function() {
      $('html,body').animate({ scrollTop: 0 }, 'slow');
    },

    hideComponent: function($el) {
      $el.addClass('display-none')
         .removeClass('display-block');
    }

  });

  return BaseView;

});
