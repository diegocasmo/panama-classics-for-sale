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

    className: 'small-12 medium-8 columns medium-centered car-item-view',

    tagName: 'li',

    template: _.template(
      '<a class="car-item-link" href=<%= link %> target="_blank">' +
        '<img class="car-item-company-seller" src="<%= companyLogo %>"/>' +
        '<img src=<%= image %> class="car-item-image">' +
        '<div class="car-item-details">' +
          '<h4 class="car-item-title"><%= title %></h4>' +
          '<h6 class="car-item-price"><%= price %></h6>' +
          '<h6 class="car-item-sold"><%= sold %></h6>' +
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
