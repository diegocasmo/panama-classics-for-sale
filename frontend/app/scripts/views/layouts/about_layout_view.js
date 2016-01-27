// Renders application about page view components
/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base_view',
  'views/shared/navigation_view',
  'views/about/about_view'
], function($, _, Backbone, BaseView, NavigationView,
            AboutView) {

  'use strict';

  var AboutLayoutView = BaseView.extend({

    className: 'about-page',

    template: _.template(
      '<div id="navigation-view"></div>' +
      '<div id="about-view"></div>'
    ),

    render: function() {
      this.$el.html(this.template());
      this.renderSubViews();
      return this;
    },

    renderSubViews: function() {
      this.renderViews({
        '#navigation-view': new NavigationView(),
        '#about-view'     : new AboutView()
      });
    }

  });

  return AboutLayoutView;

});
