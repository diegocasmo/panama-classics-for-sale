// Renders application communities page views
/*global define*/
define([
  'views/base_page',
  'views/shared/navigation_view',
  'views/community/community_index'
], function(BasePage, NavigationView, CommunityIndex) {

  'use strict';

  var CommunitiesPageView = BasePage.extend({

    className: 'communities-page',

    template: _.template(
      '<img class="logo" src="img/logo.png" />' +
      '<p>En Panamá existen varias comunidades de entusiastas ' +
      'de carros clásicos y deportivos. ¡Únete a ellas y conoce más personas ' +
      'que compartan tus gustos y pasiones!</p>'
    ),

    getViewsToRender: function() {
      return [
        new NavigationView(),
        new CommunityIndex({ 'communities': this.communities })
      ];
    },

    initialize: function(options) {
      this.communities = options.communities;
    }

  });

  return CommunitiesPageView;

});
