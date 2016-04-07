// Renders application about page views
/*global define*/
define([
  'views/base_page',
  'views/shared/navigation_view',
  'views/about/about_show'
], function(BasePage, NavigationView, AboutShow) {

  'use strict';

  var AboutPageView = BasePage.extend({

    className: 'about-page',

    template: _.template(
      '<img class="logo" src="img/logo.png" />'
    ),

    getViewsToRender: function() {
      return [
        new NavigationView(),
        new AboutShow()
      ];
    }

  });

  return AboutPageView;

});
