// Renders application cars page views
/*global define*/
define([
  'views/base_page',
  'models/app_state',
  'views/car/car_index',
  'views/shared/navigation_view',
  'views/shared/search_form_view'
], function(BasePage, AppState, CarIndex, NavigationView,
  SearchFormView) {

  'use strict';

  var CarsPageView = BasePage.extend({

    className: 'cars-page',

    context: function() {
      return {
        'countryName': AppState.get().country().name
      };
    },

    template: _.template(
      '<img class="logo" src="img/logo.png" />' +
      '<p>Mostrando resultados para: <%= countryName %>.<p>'
    ),

    getViewsToRender: function() {
      return [
        new NavigationView(),
        new SearchFormView({
          'collection': this.cars,
          'placeholder': 'Busca un carro...'
        }),
        new CarIndex({
          'cars': this.cars
        })
      ];
    },

    initialize: function(options) {
      this.cars = options.cars;
    }

  });

  return CarsPageView;

});
