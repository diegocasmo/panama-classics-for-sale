// Renders information about communities
/*global define, ga*/
define([
  'views/base_view',
], function(BaseView) {

  'use strict';

  var CommunityInfo = BaseView.extend({

    className: 'community-info',

    template: _.template(
      '<p class="community-info-text">Si deseas agregar alguna comunidad a este ' +
      'sitio, por favor llena el siguiente formulario: ' +
      '<a data-ga="agregar-comunidad" target="_blank" href="https://docs.google.com/forms/d/1GMtvKtJeiN-71-QmCHJRGpqtRCiQo_TQwYu29KRdOIk">Agregar Comunidad</a>.</p>'
    ),

    events: {
      'click a': '_trackLinkClick'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    _trackLinkClick: function() {
      var dataGa = this.$el.find('a').attr('data-ga');
      if (typeof(dataGa) !== 'undefined') {
        ga('send', 'event', 'link', 'click', dataGa);
      }
    }

  });

  return CommunityInfo;

});
