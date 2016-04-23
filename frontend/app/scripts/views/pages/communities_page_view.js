// Renders application communities page views
/*global define*/
define([
  'views/base_page',
  'models/app_state',
  'views/shared/navigation_view',
  'views/community/community_index',
  'views/community/community_info'
], function(BasePage, AppState, NavigationView,
  CommunityIndex, CommunityInfo) {

  'use strict';

  var CommunitiesPageView = BasePage.extend({

    className: 'communities-page',

    context: function() {
      return {
        'countryName': AppState.get().country().name
      };
    },

    template: _.template(
      '<img class="logo" src="img/logo.png" />' +
      '<p>En <%= countryName %> existen varias comunidades de entusiastas ' +
      'de carros clásicos y deportivos. ¡Únete a ellas y conoce más personas ' +
      'que compartan tus gustos y pasiones!</p>'
    ),

    getViewsToRender: function() {
      return [
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
