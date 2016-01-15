// Main application view
/*global define*/
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  'use strict';

  var AppView = Backbone.View.extend({

    el: $('#app-wrapper'),

    _currentView: null,

    showView: function(nextView) {
      window.scrollTo(0, 0);
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
