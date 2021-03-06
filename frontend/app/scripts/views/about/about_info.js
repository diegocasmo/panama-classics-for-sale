// Renders about info message
/*global define*/
define([
  'views/base_view'
], function(BaseView) {

  'use strict';

  var AboutInfo = BaseView.extend({

    className: 'about-info',

    template: _.template(
      '<p class="about-info-message">Panamá Clásicos es una aplicación sin fines de lucro ' +
      'dedicada a las personas amantes de los carros clásicos. ' +
      'El objetivo de Panamá Clásicos es poder brindar un espacio ' +
      'en dónde se pueda encontrar con facilidad oportunidades de ' +
      'adquisición de carros clásicos. Si deseas colaborar ' +
      'con el desarrollo de esta aplicación lo puedes hacer a través de: ' +
      '<a href="https://github.com/diegocasmo/panama-classics-for-sale" ' +
      'target="_blank" >https://github.com/diegocasmo/panama-classics-for-sale</a>.</p>'
    ),

    render: function() {
      this.$el.html(this.template());
      return this;
    }

  });

  return AboutInfo;

});
