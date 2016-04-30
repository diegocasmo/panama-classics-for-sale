// Main application view. Renders view passed to it
// as current page
/*global define*/
define([
  'views/base_view',
  'models/app_state',
  'views/pages/countries_page_view',
  'views/pages/cars_page_view',
  'views/pages/communities_page_view',
  'views/pages/about_page_view'
], function(BaseView, AppState, CountriesPageView, CarsPageView,
  CommunitiesPageView, AboutPageView) {

  'use strict';

  var AppView = BaseView.extend({

    el: $('#app-wrapper'),

    initialize: function(options) {
      this.countries = options.countries;
      this.cars = options.cars;
      this.communities = options.communities;
    },

    showCountriesPage: function() {
      this._showView(new CountriesPageView({ 'countries': this.countries }));
    },

    showCarsPage: function() {
      this._showView(new CarsPageView({ 'cars': this.cars }));
    },

    showCommunitiesPage: function() {
      this._showView(new CommunitiesPageView({ 'communities': this.communities }));
    },

    showAboutPage: function() {
      this._showView(new AboutPageView());
    },

    setAsCurrentCountry: function(countrySlug) {
      var country = this.countries.findWhere({ 'slug': countrySlug });
      if(country) {
        AppState.get().setCountry(country);
        return true;
      }
      return false;
    },

    _currentView: null,

    _showView: function(nextView) {
      this.scrollToTop();
      if(this._currentView) {
        this._currentView.removeChildViews();
      }
      this._currentView = nextView;
      this._render(this._currentView);
    },

    _render: function(view) {
      this.$el.html(view.render().el);
      return this;
    }

  });

  return AppView;

});
