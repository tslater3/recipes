import "./dependencies";
import "./lib/underscore_mixins";
import "./lib/underscore_string";
import _ from 'lodash';
// import {camel, none, pascal, snake} from './lib/path_helpers';

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
  ngTemplateIconsContext
} from './contexts';

const app = angular.module('adminfront', [
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

app.run(function ($state, $rootScope, $http, NgMdIconExtensions, ngMdIconService, pendingRequests, $mdDialog) {
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
  });

  $rootScope.icons = _.map(ngTemplateIconsContext.keys(), function(k){
    return k.substr(1);
  });

  $rootScope.state_changes = {};

  $rootScope.$on('$stateChangeSuccess', function(ev, to, to_params, from, from_params) {
    $rootScope.state_changes.previous = {
      name: from,
      params: from_params
    };

    $rootScope.state_changes.current = {
      name: to,
      params: to_params
    };
  });
});

export default app;
