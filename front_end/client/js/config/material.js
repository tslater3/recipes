import _ from 'lodash';
import {ngTemplateIconsContext} from '../contexts';

const IconPaths = ngTemplateIconsContext.keys();

export default /* @ngInject */ function($mdThemingProvider, $mdIconProvider, ICONS) {
  $mdThemingProvider.definePalette('reaction-grey', $mdThemingProvider.extendPalette('grey', {
    'contrastDefaultColor': 'light',
    '500': '#757575'
  }));

  //"lighter" because by default all oranges up to 700 use black as text color.
  $mdThemingProvider.definePalette('reaction-light-blue', $mdThemingProvider.extendPalette('light-blue', {
    'contrastLightColors': ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'A100', 'A200', 'A400', 'A700']
  }));

  $mdThemingProvider.definePalette('reaction-orange', $mdThemingProvider.extendPalette('deep-orange', {
    'contrastDefaultColor': 'light'
  }));

  $mdThemingProvider.theme('default')
                    .primaryPalette('reaction-grey')
                    .accentPalette('reaction-light-blue')
                    .warnPalette('reaction-orange');

  _.each(IconPaths, function(path){
    var url = path.substr(1),
        icon_key = path.split('.')[1];

    $mdIconProvider.icon(icon_key, url, 24);
  });

  //todo deprecate this and use icon paths directly
  _.each(ICONS, function(ikons, group) {
    _.each(ikons, function(ikon) {
      var url = `/${ikon}.svg`,
          icon_key = `${group}:${ikon}`;

      $mdIconProvider.icon(icon_key, url, 24);
    });
  });
}
