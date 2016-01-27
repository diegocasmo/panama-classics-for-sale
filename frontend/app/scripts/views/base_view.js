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
    },

    // Renders a particular view on the specified element
    renderViews: function(views) {
      var that = this;
      _.each(views, function(view, selector) {
        that.subViews.push(view);
        that.$el.find(selector).html(view.render().el);
      });
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
