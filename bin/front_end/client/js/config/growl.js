export default /* @ngInject */ function(growlProvider) {
  growlProvider.globalTimeToLive({success: 2000, error: 10000, warning: 3000, info: 3000});
  growlProvider.globalDisableIcons(true);
  // growlProvider.globalInlineMessages(true);
  growlProvider.globalDisableCountDown(true);
  growlProvider.onlyUniqueMessages(true);
}
