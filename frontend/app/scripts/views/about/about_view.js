// Renders the about page essage in DOM
/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base_view',
  'lang/es_locale'
], function($, _, Backbone, BaseView, esLocale) {

  'use strict';

  var AboutItemView = BaseView.extend({

    className: 'about-view',

    template: _.template(
      '<p><%= aboutText %></p>'
    ),

    render: function() {
      this.$el.html(this.template(esLocale.about));
      return this;
    }

  });

  return AboutItemView;

});
