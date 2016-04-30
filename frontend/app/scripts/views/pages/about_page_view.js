// Renders application about page views
/*global define*/
define([
  'views/base_page',
  'views/shared/logo_show',
  'views/shared/navigation_view',
  'views/about/about_info'
], function(BasePage, LogoShow, NavigationView, AboutInfo) {

  'use strict';

  var AboutPageView = BasePage.extend({

    className: 'about-page',

    getViewsToRender: function() {
      return [
        new LogoShow(),
        new NavigationView(),
        new AboutInfo()
      ];
    }

  });

  return AboutPageView;

});
