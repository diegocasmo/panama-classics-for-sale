// Renders a list of cars
/*global define*/
define([
  'views/base_view',
  'models/app_state',
  'views/car/car_show',
  'views/shared/message_view',
  'services/list_paginator'
], function(BaseView, AppState, CarShow,
  MessageView, ListPaginator) {

  'use strict';

  var CarIndex = BaseView.extend({

    className: 'car-index',

    template: _.template(
      '<ul class="car-index-list"></ul>' +
      '<div id="loading-wrapper">' +
        '<div class="loading-icon"></div>' +
        '<p class="car-index-searching">Buscando carros clásicos en <%= countryName %>...</p>' +
      '</div>' +
      '<div id="message-view"></div>'
    ),

    // Unbind window scroll event before removing view
    remove: function() {
      $(window).off('scroll');
      BaseView.prototype.remove.call(this);
    },

    initialize: function(options) {
      this.cars = options.cars;
      this.bindCarsEvents();
      this.cars.fetch();
    },

    render: function() {
      var context = {
        'countryName': AppState.get().country().name
      };
      this.$el.html(this.template(context));
      return this;
    },

    bindCarsEvents: function() {
      var that = this;
      this.listenTo(this.cars, 'sync search:done search:clear',
        _.bind(this.setUpPaginatedList, this));
      this.listenTo(this.cars, 'error', function() {
        that.renderMessage('¡Huh :(! Ha ocurrido un error. Vuelve a intentarlo más tarde.');
      });
    },

    setUpPaginatedList: function(collection) {
      var list = collection.map(function(m) { return m.attributes; });
      if (list.length > 0) {
        this.paginatedCars = new ListPaginator(list);
        this.removeCarsIndexList();
        this.hideLoadingIndicator();
        this.$el.find('#message-view').empty();
        this.renderCarIndexList(this.paginatedCars.getFirstPage());
        $(window).on('scroll', _.bind(this.loadMore, this));
      } else {
        this.renderMessage('No se ha encontrado ningún carro clásico.');
      }
    },

    renderCarIndexList: function(cars) {
      var that = this;
      var carIndex = _.map(cars, function(car) {
        var carShow = new CarShow({ car: car });
        that.subViews.push(carShow);
        return carShow.render().el;
      });
      this.$el.find('.car-index-list').append(carIndex);
    },

    loadMore: function() {
      var pageBottom = $(document).height() - $(window).height();
      if ($(window).scrollTop() >= pageBottom) {
        this.renderCarIndexList(this.paginatedCars.getNextPage());
      }
    },

    renderMessage: function(msg) {
      this.removeCarsIndexList();
      this.hideLoadingIndicator();
      var messageView = new MessageView({ message: msg });
      this.subViews.push(messageView);
      this.$el.find('#message-view')
        .html(messageView.render().el);
    },

    removeCarsIndexList: function() {
      this.$el.find('.car-index-list > li').remove();
    },

    hideLoadingIndicator: function() {
      this.hideComponent(this.$el.find('#loading-wrapper'));
    }

  });

  return CarIndex;

});
