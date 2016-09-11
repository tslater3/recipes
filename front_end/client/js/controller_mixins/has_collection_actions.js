import _ from 'lodash';
import { autobind } from 'core-decorators';

const maybeDestroyTitle = function(item) {
  return `Please confirm destruction`;
}

const maybeDestroyContent = function(item) {
  return `
    <br>
    You are about to destroy <strong>${_.tryName(item)}</strong>.
    Are you sure you want to proceed?
  `;
}

function runCallbacks(...args) {
  let callbacks = _.flatCompactUniq(args);
  return _.invoke(callbacks, 'call');
}

class HasCollectionActionsClass {
  constructor(_config={}) {
    _.assign(this, _config);
  }

  addItem(params={}) {
    this.controller.collection.$build(params).$reveal();
  }

  saveAll() {
    this.controller.has_collection.filterByChanged().map(item => this.saveResource(item));

    if(_.respondTo(this.controller, 'afterSaveAll')) {
      this.controller.afterSaveAll();
    }
  }

  destroyAll() {
    this.controller.collection.map(item => item.$destroy());

    if(_.respondTo(this.controller, 'afterDestroyAll')) {
      this.controller.afterDestroyAll();
    }
  }

  maybeDestroyResource(item) {
    if(item.isNew()) {
      return this.destroyResource(item);
    }

    let self = this,
        title = maybeDestroyTitle(item),
        content = maybeDestroyContent(item),
        dialog = this.$mdDialog.confirm()
                          .title(title)
                          .htmlContent(content)
                          .ariaLabel(title)
                          .ok('Confirm')
                          .cancel('Cancel');

    this.$mdDialog.show(dialog).then((result) => this.destroyResource(item));
  }

  destroyResource(item, ...callbacks) {
    item.$destroy().$then((result) => runCallbacks(...callbacks));
  }

  save() {
    this.controller.has_collection.filterByChanged().map(item => this.saveResource(item));
  }

  saveResource(item, ...callbacks) {
    item.$save().$then((result) => runCallbacks(this.showResourceSaveSuccess(item), ...callbacks));
  }

  showResourceSaveSuccess(item) {
    this.Notify.resourceSaveSuccess(item);
  }
}

export default /* @ngInject */ function HasCollectionActions(mixin, $mdDialog, Notify) {
  return {
    included(options) {
      mixin.require(this, 'HasCollection');

      let _config = {
        $mdDialog: $mdDialog,
        Notify: Notify,
        controller: this
      };

      this.has_collection_actions = new HasCollectionActionsClass(_config);
    },
    set has_collection_actions(val) {
      var self = this;
      self._has_collection_actions = val;
    },
    get has_collection_actions() {
      return this._has_collection_actions;
    }
  };
}
