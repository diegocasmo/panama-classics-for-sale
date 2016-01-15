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
      this.renderSubView({
        View: NavigationView,
        $el : this.$el.find('#navigation-view')
      });
    },

    renderAboutView: function() {
      this.renderSubView({
        View: AboutView,
        $el : this.$el.find('#about-view')
      });
    }

  });

  return AboutLayoutView;

});
