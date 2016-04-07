// Renders a list of communities
/*global define*/
define([
  'views/base_view',
  'views/community/community_show'
], function(BaseView, CommunityShow) {

  'use strict';

  var CommunityIndex = BaseView.extend({

    tagName: 'ol',

    className: 'community-index',

    initialize: function(options) {
      this.communities = options.communities;
    },

    render: function() {
      var that = this;
      var communityIndex = this.communities.map(function(community) {
        var communityShow = new CommunityShow({
          'community': community.toJSON()
        });
        that.subViews.push(communityShow);
        return communityShow.render().el;
      });
      this.$el.append(communityIndex);
      return this;
    }

  });

  return CommunityIndex;

});
