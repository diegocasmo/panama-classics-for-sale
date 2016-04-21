// Renders a single country
/*global define*/
define([
  'views/base_view',
], function(BaseView) {

  'use strict';

  var CountryShow = BaseView.extend({

    tagName: 'li',

    className: 'country-show',

    template: _.template(
      '<a class="country-link" href="#carros/<%= slug %>"><%= name %></a>'
    ),

    initialize: function(options) {
      this.country = options.country;
    },

    render: function() {
      this.$el.html(this.template(this.country));
      return this;
    }

  });

  return CountryShow;

});
