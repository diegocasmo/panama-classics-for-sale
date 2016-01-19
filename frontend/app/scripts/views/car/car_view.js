// Renders a single car in DOM
/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base_view'
], function($, _, Backbone, BaseView) {

  'use strict';

  var CarView = BaseView.extend({

    className: 'small-12 medium-10 columns small-centered medium-centered car-view',

    tagName: 'li',

    template: _.template(
      '<a class="car-link" href=<%= link %> target="_blank">' +
        '<img class="car-company-seller" src="<%= companyLogo %>"/>' +
        '<img src=<%= image %> class="car-image">' +
        '<div class="car-details">' +
          '<h4 class="car-title"><%= title %></h4>' +
          '<h6 class="car-price"><%= price %></h6>' +
          '<h6 class="car-sold"><%= sold %></h6>' +
        '</div>' +
      '</a>'
    ),

    render: function(context) {
      this.$el.html(this.template(context));
      return this;
    }

  });

  return CarView;

});
