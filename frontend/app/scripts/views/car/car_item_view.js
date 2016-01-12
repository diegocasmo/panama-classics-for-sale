// Renders a single car item in DOM
/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base_view'
], function($, _, Backbone, BaseView) {

  'use strict';

  var CarItemView = BaseView.extend({

    className: 'small-12 columns car-item-view',

    tagName: 'li',

    template: _.template(
      '<a target="_blank" class="car-item-link" href=<%= link %>>' +
        '<img class="car-item-image" src=<%= image %>>' +
        '<div class="car-item-details">' +
          '<h4 class="car-item-title"><%= title %></h4>' +
          '<span class="car-item-price"><%= price %></span>' +
          '<span class="car-item-sold"><%= sold %></span>' +
        '</div>' +
      '</a>'
    ),

    render: function(context) {
      this.$el.html(this.template(context));
      return this;
    }

  });

  return CarItemView;

});
