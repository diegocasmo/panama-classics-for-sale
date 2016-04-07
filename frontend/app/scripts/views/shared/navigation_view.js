// Renders the navigation view
/*global define*/
define([
  'views/base_view'
], function(BaseView) {

  'use strict';

  var NavigationView = BaseView.extend({

    className: 'navigation-view row',

    tagName: 'ul',

    template: _.template(
      '<li class="navigation-item small-4">' +
        '<span class="navigation-item-bubble">Carros</span>' +
        '<a class="fa fa-car navigation-link" href="#carros"></a>' +
      '</li>' +
      '<li class="navigation-item small-4">' +
        '<span class="navigation-item-bubble">Comunidades</span>' +
        '<a class="fa fa-users navigation-link" href="#comunidades"></a>' +
      '</li>' +
      '<li class="navigation-item small-4">' +
        '<span class="navigation-item-bubble">Nosotros</span>' +
        '<a class="fa fa-info-circle navigation-link" href="#nosotros"></a>' +
      '</li>'
    ),


    render: function() {
      this.$el.html(this.template());
      return this;
    }

  });

  return NavigationView;

});
