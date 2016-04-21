// Renders a single car
/*global define*/
define([
  'views/base_view',
  'models/app_state'
], function(BaseView, AppState) {

  'use strict';

  var CarView = BaseView.extend({

    className: 'small-12 medium-10 columns small-centered medium-centered car-show',

    tagName: 'li',

    template: _.template(
      '<a class="car-link" href=<%= link %> target="_blank">' +
        '<img class="car-company-seller" src="<%= companyLogo %>"/>' +
        '<img src=<%= image %> class="car-image">' +
        '<div class="car-details">' +
          '<h4 class="car-title"><%= title %></h4>' +
          '<% if (price) { %>' +
            '<h6 class="car-price"><%= currencySign %><%= price %></h6>' +
          '<% } else { %>' +
            '<h6 class="car-price">Sin Precio</h6>' +
          '<% } %>' +
          '<% if (sold) { %>' +
            '<h6 class="car-sold">Vendido</h6>' +
          '<% } else { %>' +
            '<h6 class="car-sold">Sin Vender</h6>' +
          '<% } %>' +
        '</div>' +
      '</a>'
    ),

    initialize: function(options) {
      this.car = options.car;
    },

    render: function() {
      var context = _.extend(this.car,
        { currencySign: AppState.get().country().currencySign });
      this.$el.html(this.template(context));
      return this;
    }

  });

  return CarView;

});
