import "./dependencies";
import "./lib/underscore_mixins";
import "./lib/underscore_string";
import _ from 'lodash';
import {camel, none, pascal, snake} from './lib/path_helpers';

import {
  configContext,
  constantsContext,
  controllerMixinsContext,
  controllersContext,
  componentsContext,
  directivesContext,
  factoriesContext,
  filtersContext,
  modelMixinsContext,
  modelsContext,
  routesContext,
  utilsContext,
  providersContext,
  ngTemplateContext,
  ngTemplateIconsContext
} from './contexts';

const app = angular.module('frontend', [
  "angular-growl",
  "angular-clipboard",
  "angular-svg-round-progress",
  "angularMoment",
  "cfp.hotkeys",
  "dotjem.angular.tree",
  "mdPickers",
  "ng",
  "ngAnimate",
  "ngAria",
  "md.data.table",
  "ngFileUpload",
  "ngJsonEditor",
  "ngMaterial",
  "ngMdIcons",
  "ngSanitize",
  "ngTagsInput",
  "nvd3",
  "restmod",
  "ui.router",
  "vs-repeat"
]);

const ALLOWED_TYPE_OVERRIDES = ['directive', 'component', 'controller'];
const entries = [];

function hasTypeOverride(word) {
  return _.includes(ALLOWED_TYPE_OVERRIDES, word);
}

function register(context, type, keyFn) {
  context.keys().forEach(function(path) {
    let key = keyFn(path),
        file_name = _.last(path.split("/")),
        segs = file_name.split("."),
        type_override = _.find(segs, hasTypeOverride),
        module_type = type_override || type,
        file = context(path);

    if(type_override) {
      key = key.split('.').shift();
    }

    entries.push({type: type, key: key, path: path});
    app[module_type].apply(app, _.compact([key, file]));
  });
}

register(configContext,           'config'    , none);
register(constantsContext,        'constant'  , snake);
register(controllerMixinsContext, 'factory'   , pascal);
register(controllersContext,      'controller', pascal);
register(componentsContext,       'component',  camel);
register(directivesContext,       'directive' , camel);
register(factoriesContext,        'factory'   , pascal);
register(filtersContext,          'filter'    , camel);
register(modelMixinsContext,      'factory'   , pascal);
register(modelsContext,           'factory'   , pascal);
register(routesContext,           'config'    , none);
register(utilsContext,            'factory'   , camel);
register(providersContext,        'provider'  , camel);

ngTemplateContext.keys().forEach(ngTemplateContext);
ngTemplateIconsContext.keys().forEach(ngTemplateIconsContext);

app.run(function ($state, $rootScope, $http, NgMdIconExtensions, ngMdIconService, pendingRequests, $mdDialog, stateChanges) {
  _.each(NgMdIconExtensions, function(svg, name){
    ngMdIconService.addShape(name, svg);
  });

  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    console.log("State change error", error);
    console.log(toState, toParams);
  });

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, error) {
    if(toState.redirectTo) {
      event.preventDefault();
      $state.go(toState.redirectTo, toParams, {location: 'replace'});
    }

    if($http.anyCancelablePendingRequests()) {
       let warning_text = `It looks like there are requests happening in the background. If you change pages, they will be cancelled. Do you want to cancel pending requests and change pages?`,
           confirm = $mdDialog.confirm()
                              .title('Cancel pending requests?')
                              .content(warning_text)
                              .ariaLabel('Confirm page change')
                              .targetEvent(event)
                              .ok('Yes, cancel requests')
                              .cancel('No, stay on page');

       $mdDialog.show(confirm).then(function() {
         pendingRequests.cancelAll();
       }, function() {
         event.preventDefault();
       });
    }
  });

  $rootScope.icons = _.map(ngTemplateIconsContext.keys(), function(k){
    return k.substr(1);
  });

  $rootScope.sidebar_expanded = true;
});

export default app;
