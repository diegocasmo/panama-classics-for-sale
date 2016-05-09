// Renders a list of communities
/*global define*/
define([
  'views/base_view',
  'models/app_state',
  'views/community/community_show',
  'views/shared/message_view'
], function(BaseView, AppState, CommunityShow, MessageView) {

  'use strict';

  var CommunityIndex = BaseView.extend({

    tagName: 'ol',

    className: 'community-index',

    template: _.template(
      '<div id="loading-wrapper">' +
        '<div class="loading-icon"></div>' +
      '</div>'
    ),

    initialize: function(options) {
      this.communities = options.communities;
      this.bindCommunitiesEvents();
      this.communities.fetch();
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    bindCommunitiesEvents: function() {
      var that = this;
      this.listenTo(this.communities, 'sync', _.bind(this.renderCommunities, this));
      this.listenTo(this.communities, 'error', function() {
        that.renderMessage('No hemos podido cargar las comunidades de: ' + AppState.get().country().name + '.');
      });
    },

    renderCommunities: function() {
      var that = this,
          communities = this.communities.where({ 'countrySlug' : AppState.get().country().slug });
      if(_.isEmpty(communities)) {
        this.renderMessage('No hay comunidades de ' + AppState.get().country().name + '.');
      } else {
        var communityIndex = communities.map(function(community) {
          var communityShow = new CommunityShow({
            'community': community.toJSON()
          });
          that.subViews.push(communityShow);
          return communityShow.render().el;
        });
        this.$el.html(communityIndex);
      }
    },

    renderMessage: function(msg) {
      var messageView = new MessageView({ message: msg });
      this.subViews.push(messageView);
      this.$el.html(messageView.render().el);
    }

  });

  return CommunityIndex;

});
