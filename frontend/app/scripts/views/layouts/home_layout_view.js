// Renders application home page view components
/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base_view',
  'views/car/cars_list_view',
  'views/shared/navigation_view',
  'views/shared/error_view',
  'lang/es_locale'
], function($, _, Backbone, BaseView, CarsListView, NavigationView,
          ErrorView, esLocale) {

  'use strict';

  var HomeLayoutView = BaseView.extend({

    className: 'home-page',

    template: _.template(
      '<div id="navigation-view"></div>' +
      '<div id="car-list-view">' +
        '<div class="loader"></div>' +
        '<p class="home-page--searching"><%= searching %></p>' +
      '</div>'
    ),

    initialize: function(options) {
      this.cars = options.cars;
    },

    render: function() {
      this.$el.html(this.template(esLocale.home));
      this.renderNavigationView();
      this.bindCarsEvents();
      this.cars.fetchIfNotCached();
      return this;
    },

    renderNavigationView: function() {
      var navigationView = new NavigationView();
      this.subViews.push(navigationView);
      this.$el.find('#navigation-view')
        .html(navigationView.render().el);
    },

    bindCarsEvents: function() {
      this.cars.on('sync', _.bind(this.renderCarsListView, this));
      this.cars.on('error', _.bind(this.renderErrorView, this));
    },

    renderCarsListView: function() {
      var carsListView = new CarsListView({
        cars: this.cars.toJSON()
      });
      this.subViews.push(carsListView);
      this.$el.find('#car-list-view').html(carsListView.render().el);
    },

    renderErrorView: function() {
      var errorView = new ErrorView();
      this.subViews.push(errorView);
      this.$el.find('#car-list-view')
        .html(errorView.render(esLocale.home.onErrorMessage).el);
    }

  });

  return HomeLayoutView;

});
