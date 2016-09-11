const default_title = "Really Reset?";
const default_content =   `<br>This will reset any changes you have made.
                           <br>Are you sure you would like to start over?`;

export default /* @ngInject */ function($mdDialog) {
  function resetFormDecision(controller, title, content) {
    let dialog = $mdDialog.confirm()
          .title(title)
          .htmlContent(content)
          .ariaLabel(title)
          .ok('Yes, Reset Form')
          .cancel('Cancel');
    return $mdDialog.show(dialog);
  }
  return {
    reallyResetForm(resource, title=default_title, content=default_content) {
      var self = this;

      return resetFormDecision(self, title, content).then(function(){
        resource.$restore();
      });
    }
  };
}
