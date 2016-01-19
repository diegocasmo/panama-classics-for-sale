// Renders application home page view components
/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base_view',
  'views/car/car_view',
  'views/shared/navigation_view',
  'views/shared/search_form_view',
  'views/shared/message_view',
  'services/list_paginator',
  'lang/es_locale'
], function($, _, Backbone, BaseView, CarView, NavigationView,
          SearchFormView, MessageView, ListPaginator, esLocale) {

  'use strict';

  var HomeLayoutView = BaseView.extend({

    className: 'home-page',

    template: _.template(
      '<div id="navigation-view"></div>' +
      '<div id="search-form-view"></div>' +
      '<ul id="car-list-view">' +
        '<div id="home-loading-wrapper">' +
          '<div class="loader"></div>' +
          '<p class="home-page-searching"><%= searching %></p>' +
        '</div>' +
      '</ul>' +
      '<div id="message-view"></div>'
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
      this.renderSearchFormView();
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

    renderSearchFormView: function() {
      this.renderSubView({
        View   : SearchFormView,
        $el    : this.$el.find('#search-form-view'),
        context: { collection: this.cars, placeholder: esLocale.home.searchPlaceholder }
      });
    },

    bindCarsEvents: function() {
      this.cars.on('sync search:done search:clear', _.bind(this.setUpPaginatedList, this));
      this.cars.on('error', _.bind(this.renderErrorView, this));
      this.cars.on('search:empty', _.bind(this.renderNoResultsView, this));
    },

    setUpPaginatedList: function(collection) {
      var list = collection.map(function(m) { return m.attributes; });
      this.paginatedCars = new ListPaginator(list);
      this.removeCarsList();
      this.hideLoadingIndicator();
      this.$el.find('#message-view').empty();
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
      this.removeCarsList();
      this.hideLoadingIndicator();
      this.renderSubView({
        View   : MessageView,
        $el    : this.$el.find('#message-view'),
        context: { message: esLocale.home.onErrorMessage }
      });
    },

    renderNoResultsView: function() {
      this.removeCarsList();
      this.hideLoadingIndicator();
      this.renderSubView({
        View   : MessageView,
        $el    : this.$el.find('#message-view'),
        context: { message: esLocale.cars.noResults }
      });
    },

    removeCarsList: function() {
      this.$el.find('#car-list-view > li').remove();
    },

    hideLoadingIndicator: function() {
      this.hideComponent(this.$el.find('#home-loading-wrapper'));
    }

  });

  return HomeLayoutView;

});
