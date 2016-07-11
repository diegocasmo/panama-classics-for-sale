// Renders a single country
/*global define, ga*/
define([
  'views/base_view',
], function(BaseView) {

  'use strict';

  var CountryShow = BaseView.extend({

    tagName: 'li',

    className: 'country-show',

    template: _.template(
      '<a data-ga="<%= slug %>" class="country-link" href="#carros/<%= slug %>"><%= name %></a>'
    ),

    events: {
      'click a': '_trackLinkClick'
    },

    initialize: function(options) {
      this.country = options.country;
    },

    render: function() {
      this.$el.html(this.template(this.country));
      return this;
    },

    _trackLinkClick: function() {
      var dataGa = this.$el.find('a').attr('data-ga');
      if (typeof(dataGa) !== 'undefined') {
        ga('send', 'event', 'link', 'click', dataGa);
      }
    }

  });

  return CountryShow;

});
