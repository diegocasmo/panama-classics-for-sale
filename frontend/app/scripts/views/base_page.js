// Define basic functionality which application pages
// share among them
/*global define*/
define([
  'views/base_view'
], function(BaseView) {

  'use strict';

  var BasePage = BaseView.extend({

    render: function() {
      var that = this;
      _.each(this.getViewsToRender(), function(view) {
        that.subViews.push(view);
        that.$el.append(view.render().el);
      });
      return this;
    }

  });

  return BasePage;

});
