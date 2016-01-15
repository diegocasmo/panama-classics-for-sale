// Renders application home page view components
/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base_view',
  'views/car/car_view',
  'views/shared/navigation_view',
  'views/shared/error_view',
  'services/list_paginator',
  'lang/es_locale'
], function($, _, Backbone, BaseView, CarView, NavigationView,
          ErrorView, ListPaginator, esLocale) {

  'use strict';

  var HomeLayoutView = BaseView.extend({

    className: 'home-page',

    template: _.template(
      '<div id="navigation-view"></div>' +
      '<ul id="car-list-view">' +
        '<div id="home-loading-wrapper">' +
          '<div class="loader"></div>' +
          '<p class="home-page-searching"><%= searching %></p>' +
        '</div>' +
      '</ul>'
    ),

    // Unbind window scroll event before removing view
    remove: function() {
      $(window).off('scroll');
      BaseView.prototype.remove.call(this);
    },

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
      this.renderSubView({
        View: NavigationView,
        $el : this.$el.find('#navigation-view')
      });
    },

    bindCarsEvents: function() {
      this.cars.on('sync', _.bind(this.setUpPaginatedList, this));
      this.cars.on('error', _.bind(this.renderErrorView, this));
    },

    setUpPaginatedList: function() {
      this.paginatedCars = new ListPaginator(
        this.cars.map(function(m) { return m.attributes; }));
      this.hideComponent(this.$el.find('#home-loading-wrapper'));
      this.renderCarsListView(this.paginatedCars.getFirstPage());
      $(window).on('scroll', _.bind(this.loadMore, this));
    },

    renderCarsListView: function(cars) {
      var that = this;
      var carViewList = _.map(cars, function(car) {
        var carView = new CarView();
        that.subViews.push(carView);
        return carView.render(car).el;
      });
      this.$el.find('#car-list-view').append(carViewList);
    },

    loadMore: function() {
      var pageBottom = $(document).height() - $(window).height();
      if ($(window).scrollTop() >= pageBottom) {
        this.renderCarsListView(this.paginatedCars.getNextPage());
      }
    },

    renderErrorView: function() {
      this.renderSubView({
        View   : ErrorView,
        $el    : this.$el.find('#car-list-view'),
        context: { errorText: esLocale.home.onErrorMessage }
      });
    }

  });

  return HomeLayoutView;

});
