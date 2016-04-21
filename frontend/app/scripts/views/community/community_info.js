// Renders information about communities
/*global define*/
define([
  'views/base_view',
], function(BaseView) {

  'use strict';

  var CommunityInfo = BaseView.extend({

    className: 'community-info',

    template: _.template(
      '<p class="community-info-text">Si deseas agregar alguna comunidad a este ' +
      'sitio, por favor llena el siguiente formulario: ' +
      '<a target="_blank" href="https://docs.google.com/forms/d/1GMtvKtJeiN-71-QmCHJRGpqtRCiQo_TQwYu29KRdOIk">Agregar Comunidad</a>.</p>'
    ),

    render: function() {
      this.$el.html(this.template());
      return this;
    }

  });

  return CommunityInfo;

});
