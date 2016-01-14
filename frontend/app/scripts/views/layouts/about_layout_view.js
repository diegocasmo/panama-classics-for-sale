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
      this.renderNavigationView();
      this.renderAboutView();
      return this;
    },

    renderNavigationView: function() {
      var navigationView = new NavigationView();
      this.subViews.push(navigationView);
      this.$el.find('#navigation-view')
        .html(navigationView.render().el);
    },

    renderAboutView: function() {
      var aboutView = new AboutView();
      this.subViews.push(aboutView);
      this.$el.find('#about-view')
        .html(aboutView.render().el);
    }

  });

  return AboutLayoutView;

});
