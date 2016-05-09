// Renders application communities page views
/*global define*/
define([
  'views/base_page',
  'views/shared/logo_show',
  'views/shared/navigation_view',
  'views/community/community_index',
  'views/community/community_info'
], function(BasePage, LogoShow, NavigationView,
  CommunityIndex, CommunityInfo) {

  'use strict';

  var CommunitiesPageView = BasePage.extend({

    className: 'communities-page',

    getViewsToRender: function() {
      return [
        new LogoShow(),
        new NavigationView(),
        new CommunityIndex({ 'communities': this.communities }),
        new CommunityInfo()
      ];
    },

    initialize: function(options) {
      this.communities = options.communities;
    }

  });

  return CommunitiesPageView;

});
