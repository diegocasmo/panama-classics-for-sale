// Renders an input form to be able to search
// whitin a particular collection of items
/*global define*/
define([
  'views/base_view'
], function(BaseView) {

  'use strict';

  var SearchFormView = BaseView.extend({

    className: 'search-form-view',

    tagName: 'form',

    template: _.template(
      '<input class="search-form-input" placeholder="<%= placeholder %>">' +
      '<i class="search-form-clear fa fa-times"></i>'
    ),

    events: {
      'keyup .search-form-input': 'doSearch',
      'click .search-form-clear': 'clearSearch'
    },

    initialize: function(options) {
      this.collection  = options.collection;
      this.placeholder = options.placeholder;
    },

    render: function() {
      this.$el.html(this.template({ placeholder: this.placeholder }));
      return this;
    },

    doSearch: function() {
      event.preventDefault();
      var query = this.$el.find('.search-form-input').val().trim();
      this.collection.doSearch(query);
    },

    clearSearch: function(event) {
      event.preventDefault();
      this.$el.find('.search-form-input').val('');
      this.collection.clearSearch();
    }

  });

  return SearchFormView;

});
