export default /* @ngInject */ function($provide) {
  const ErrorMessagesToIgnore = [
    "<md-input-container> can only have *one* <input>, <textarea> or <md-select> child element!"
  ];

  $provide.decorator("$exceptionHandler", ['$delegate', function($delegate) {
    return function(exception, cause) {
      let message_is_ignored = _.contains(ErrorMessagesToIgnore, exception.message);

      if(message_is_ignored) {
        //do nothing
      } else {
        $delegate(exception, cause);
      }
    };
  }]);
}
