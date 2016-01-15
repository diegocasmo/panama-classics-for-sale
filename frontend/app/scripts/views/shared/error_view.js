// Renders the specified error message in DOM
/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base_view'
], function($, _, Backbone, BaseView) {

  'use strict';

  var ErrorView = BaseView.extend({

    className: 'error-view',

    template: _.template(
      '<p class="error-view-text"><%= errorText %></p>'
    ),

    initialize: function(options) {
      this.errorText = options.errorText;
    },

    render: function() {
      this.$el.html(this.template({ errorText: this.errorText }));
      return this;
    }

  });

  return ErrorView;

});
