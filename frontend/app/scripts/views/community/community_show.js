// Renders a single community
/*global define*/
define([
  'views/base_view',
], function(BaseView) {

  'use strict';

  var CommunityShow = BaseView.extend({

    tagName: 'li',

    className: 'community-show',

    template: _.template(
      '<a target="_blank" href="<%= link %>"><%= name %></a>'
    ),

    initialize: function(options) {
      this.community = options.community;
    },

    render: function() {
      this.$el.html(this.template(this.community));
      return this;
    }

  });

  return CommunityShow;

});
