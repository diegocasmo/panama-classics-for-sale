// Renders the specified message in DOM
/*global define*/
define([
  'views/base_view'
], function(BaseView) {

  'use strict';

  var MessageView = BaseView.extend({

    className: 'message-view',

    template: _.template(
      '<p class="message-view-text"><%= message %></p>'
    ),

    initialize: function(options) {
      this.message = options.message;
    },

    render: function() {
      this.$el.html(this.template({ message: this.message }));
      return this;
    }

  });

  return MessageView;

});
