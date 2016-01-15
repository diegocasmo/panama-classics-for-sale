// Main application view. Handles what layout to
// print as current page
/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base_view'
], function($, _, Backbone, BaseView) {

  'use strict';

  var AppView = BaseView.extend({

    el: $('#app-wrapper'),

    _currentView: null,

    showView: function(nextView) {
      this.scrollToTop();
      if(this._currentView) {
        this._currentView._removeChildViews();
      }
      this._currentView = nextView;
      this._render(this._currentView);
    },

    _render: function(view) {
      this.$el.html(view.render().el);
      return this;
    }

  });

  return AppView;

});
