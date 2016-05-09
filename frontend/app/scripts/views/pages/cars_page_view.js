// Renders application cars page views
/*global define*/
define([
  'views/base_page',
  'models/app_state',
  'views/shared/logo_show',
  'views/shared/navigation_view',
  'views/shared/message_view',
  'views/car/car_index',
  'views/shared/search_form_view'
], function(BasePage, AppState, LogoShow, NavigationView,
    MessageView, CarIndex, SearchFormView) {

  'use strict';

  var CarsPageView = BasePage.extend({

    className: 'cars-page',

    getViewsToRender: function() {
      return [
        new LogoShow(),
        new NavigationView(),
        new MessageView({ message: 'Mostrando resultados para: ' +
          AppState.get().country().name + '.' }),
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
