/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'views/base_view',
  'views/car/cars_list_view',
  'lang/es_locale'
], function($, _, Backbone, BaseView, CarsListView, esLocale) {

  'use strict';

  var HomeLayoutView = BaseView.extend({

    className: 'home-page',

    template: _.template(
      '<div id="encuentra-list-view">' +
        '<img class="ajax-loader display-block"' +
          'src="img/ajax_loader.gif"/>' +
        '<p class="home-page--searching"><%= searchingEncuentra %></p>' +
      '</div>' +
      '<div id="olx-list-view">' +
        '<img class="ajax-loader display-block"' +
          'src="img/ajax_loader.gif"/>' +
        '<p class="home-page--searching"><%= searchingOlx %></p>' +
      '</div>'
    ),

    initialize: function(options) {
      this.encuentraCars = options.encuentraCars;
      this.olxCars       = options.olxCars;
    },

    render: function() {
      var context = {
        searchingEncuentra: esLocale.home.searchingEncuentra,
        searchingOlx: esLocale.home.searchingOlx,
      };
      this.$el.html(this.template(context));

      // Move
      this.bindCollectionEvents({
        collection: this.encuentraCars,
        $el: this.$el.find('#encuentra-list-view')
      });
      this.bindCollectionEvents({
        collection: this.olxCars,
        $el: this.$el.find('#olx-list-view')
      });
      this.olxCars.fetch();
      this.encuentraCars.fetch();
      // Move

      return this;
    },

    bindCollectionEvents: function(options) {
      var collection = options.collection,
          $el        = options.$el,
          that       = this;
      collection.on('sync', function(collection) {
        that.renderCarsListView($el, collection.toJSON());
      });
      collection.on('error', function() {
        console.log('render error');
      });
    },

    renderCarsListView: function($el, cars) {
      var carsListView = new CarsListView({ cars: cars });
      this.subViews.push(carsListView);
      $el.html(carsListView.render().el);
    }

  });

  return HomeLayoutView;

});
