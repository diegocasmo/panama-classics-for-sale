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
      '<p><%= errorText %></p>'
    ),

    render: function(errorText) {
      this.$el.html(this.template({ errorText: errorText }));
      return this;
    }

  });

  return ErrorView;

});
