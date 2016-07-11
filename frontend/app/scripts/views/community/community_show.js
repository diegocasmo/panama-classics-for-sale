// Renders a single community
/*global define, ga*/
define([
  'views/base_view',
], function(BaseView) {

  'use strict';

  var CommunityShow = BaseView.extend({

    tagName: 'li',

    className: 'community-show',

    template: _.template(
      '<a data-ga="<%= name %>" target="_blank" href="<%= link %>"><%= name %></a>'
    ),

    events: {
      'click a': '_trackLinkClick'
    },

    initialize: function(options) {
      this.community = options.community;
    },

    render: function() {
      this.$el.html(this.template(this.community));
      return this;
    },

    _trackLinkClick: function() {
      var dataGa = this.$el.find('a').attr('data-ga');
      if (typeof(dataGa) !== 'undefined') {
        ga('send', 'event', 'link', 'click', dataGa);
      }
    }

  });

  return CommunityShow;

});
