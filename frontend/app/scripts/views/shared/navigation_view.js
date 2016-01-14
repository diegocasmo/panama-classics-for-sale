// Renders the navigation view
/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base_view',
  'lang/es_locale'
], function($, _, Backbone, BaseView, esLocale) {

  'use strict';

  var NavigationView = BaseView.extend({

    className: 'navigation-view row',

    template: _.template(
      '<div class="navigation-wrapper">' +
        '<h1 class="navigation-title"><%= title %></h1>' +
        '<ul class="navigation-list">' +
          '<li class="navigation-item">' +
            '<a class="navigation-link" href="#inicio"><%= home %></a>' +
          '</li>' +
          '<li class="navigation-item">' +
            '<a class="navigation-link" href="#nosotros"><%= about %></a>' +
          '</li>' +
        '</ul>' +
      '<div>'
    ),

    render: function(context) {
      this.$el.html(this.template(esLocale.navigation));
      return this;
    }

  });

  return NavigationView;

});
