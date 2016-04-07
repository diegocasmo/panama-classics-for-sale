// Renders about message
/*global define*/
define([
  'views/base_view'
], function(BaseView) {

  'use strict';

  var AboutShow = BaseView.extend({

    className: 'about-show',

    template: _.template(
      '<p>Panamá Clásicos es una aplicación sin fines de lucro ' +
      'dedicada a las personas amantes de los carros clásicos. ' +
      'El objetivo de Panamá Clásicos es poder brindar un espacio ' +
      'en dónde se pueda encontrar con facilidad oportunidades de ' +
      'adquisición de carros clásicos en Panamá. Si deseas colaborar ' +
      'con el desarrollo de esta aplicación lo puedes hacer a través de: ' +
      '<a href="https://github.com/diegocasmo/panama-classics-for-sale" ' +
      'target="_blank" >https://github.com/diegocasmo/panama-classics-for-sale</a>.</p>'
    ),

    render: function() {
      this.$el.html(this.template());
      return this;
    }

  });

  return AboutShow;

});
