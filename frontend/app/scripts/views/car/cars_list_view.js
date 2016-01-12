// Renders a list of cars in DOM
/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base_view',
  'views/car/car_item_view'
], function($, _, Backbone, BaseView, CarItemView) {

  'use strict';

  var CarsListView = BaseView.extend({

    className: 'cars-list-view row',

    tagName: 'ul',

    initialize: function(options) {
      this.cars = options.cars;
    },

    render: function() {
      this.renderCarsList();
      return this;
    },

    renderCarsList: function() {
      var that = this;
      var carItemsList = this.cars.map(function(car) {
          var carItemView = new CarItemView();
          that.subViews.push(carItemView);
          return carItemView.render(car).el;
        });
      this.$el.append(carItemsList);
    }

  });

  return CarsListView;

});
