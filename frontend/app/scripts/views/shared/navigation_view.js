// Renders the navigation view
/*global define*/
define([
  'views/base_view',
  'models/app_state'
], function(BaseView, AppState) {

  'use strict';

  var NavigationView = BaseView.extend({

    className: 'navigation-view row',

    tagName: 'ul',

    template: _.template(
      '<% if (countrySlug) { %>' +
        '<li class="navigation-item small-3">' +
          '<span class="navigation-item-bubble">Países</span>' +
          '<a class="fa fa-globe navigation-link" href="#paises"></a>' +
        '</li>' +
        '<li class="navigation-item small-3">' +
          '<span class="navigation-item-bubble">Carros</span>' +
          '<a class="fa fa-car navigation-link" href="#carros/<%= countrySlug %>"></a>' +
        '</li>' +
        '<li class="navigation-item small-3">' +
          '<span class="navigation-item-bubble">Comunidades</span>' +
          '<a class="fa fa-users navigation-link" href="#comunidades/<%= countrySlug %>"></a>' +
        '</li>' +
        '<li class="navigation-item small-3">' +
          '<span class="navigation-item-bubble">Nosotros</span>' +
          '<a class="fa fa-info-circle navigation-link" href="#nosotros"></a>' +
        '</li>' +
      '<% } else { %>' +
        '<li class="navigation-item small-6">' +
          '<span class="navigation-item-bubble">Países</span>' +
          '<a class="fa fa-globe navigation-link" href="#paises"></a>' +
        '</li>' +
        '<li class="navigation-item small-6">' +
          '<span class="navigation-item-bubble">Nosotros</span>' +
          '<a class="fa fa-info-circle navigation-link" href="#nosotros"></a>' +
        '</li>' +
      '<% } %>'
    ),

    render: function() {
      var context = {
        'countrySlug': AppState.get().country().slug
      };
      this.$el.html(this.template(context));
      return this;
    }

  });

  return NavigationView;

});
