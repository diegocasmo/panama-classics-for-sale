// Renders an input form to be able to search
// whitin a particular collection of items
/*global define, ga*/
define([
  'views/base_view'
], function(BaseView) {

  'use strict';

  var SearchFormView = BaseView.extend({

    // Wait Xms to trigger search
    searchDelay: 650,

    className: 'search-form-view',

    tagName: 'form',

    template: _.template(
      '<input class="search-form-input" placeholder="<%= placeholder %>">' +
      '<i class="search-form-clear fa fa-times"></i>'
    ),

    events: {
      'keyup .search-form-input': 'handleKeyUp',
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

    handleKeyUp: function(event) {
      event.preventDefault();
      var query = this.$el.find('.search-form-input').val().trim();
      this.bufferQuerySearch(query);
    },

    bufferQuerySearch: function(query) {
      clearTimeout(this.inputTimeout);
      this.inputTimeout = setTimeout((function(_this) {
        _this.collection.doSearch(query);
        ga('send', 'event', 'search', 'keyup', query);
      })(this), this.searchDelay);
    },

    clearSearch: function(event) {
      ga('send', 'event', 'search', 'click', 'search cleared');
      event.preventDefault();
      this.$el.find('.search-form-input').val('');
      this.collection.clearSearch();
    }

  });

  return SearchFormView;

});
