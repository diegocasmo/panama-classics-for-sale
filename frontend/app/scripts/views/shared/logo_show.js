// Renders application logo
/*global define*/
define([
  'views/base_view'
], function(BaseView) {

  'use strict';

  var LogoShow = BaseView.extend({

    className: 'logo-show',

    template: _.template('<img class="logo" src="img/logo.png"></img>'),

    render: function() {
      this.$el.html(this.template());
      return this;
    }

  });

  return LogoShow;

});
