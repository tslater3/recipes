export default {
  ActionProgress(action_text='In Progress', _options={}) {
    let options = _.merge({ progress_indicator: true }, _options),
        default_close_button_template = `<md-button class="md-icon-button"><md-icon style="color:#ffffff;" ng-click="${options.close}" md-svg-src="/close.svg"></md-icon></md-button>`,
        default_progress_indicator_template = `<md-progress-circular md-mode='indeterminate' md-diameter="22px"></md-progress-circular>`,
        close_button_template = (options.close !== false) ? options.close_button_template || default_close_button_template : '',
        progress_indicator_template = (options.progress_indicator !== false) ? options.progres_indicator_template || default_progress_indicator_template : '';

    return `
      <md-toast class="md-action with-right-aligned-action" layout="row" layout-align="space-between-center">
        ${progress_indicator_template}
        <div>${action_text}</div>
        <div flex></div>
        ${close_button_template}
      </md-toast>
    `;
  },
  Notice(action_text='Notice', _options={}) {
    let options = _.merge({ progress_indicator: true, icon: 'checkmark2' }, _options),
        default_close_button_template = `<md-button class="md-icon-button"><md-icon class="fg-grey-A100 on-hover-fg-green-A400" ng-click="${options.close}" md-svg-src="/close.svg"></md-icon></md-button>`,
        close_button_template = (options.close !== false) ? options.close_button_template || default_close_button_template : '',
        default_icon_template = `<md-icon class="fg-green-A400" md-svg-src="/${options.icon}.svg"></md-icon>`,
        icon_template = (options.icon !== false) ? options.default_icon_template || default_icon_template : '';

    return `
      <md-toast class="md-action with-right-aligned-action" layout="row" layout-align="space-between-center">
        ${icon_template}
        <div flex="5"></div>
        <div style="padding: 5px 0;">${action_text}</div>
        <div flex></div>
        ${close_button_template}
      </md-toast>
    `;
  },
  Failure(action_text='Failure', _options={}) {
    let options = _.merge({ progress_indicator: true, icon: 'sad' }, _options),
        default_close_button_template = `<md-button class="md-icon-button"><md-icon class="fg-grey-A100 on-hover-fg-green-A400" ng-click="${options.close}" md-svg-src="/close.svg"></md-icon></md-button>`,
        close_button_template = (options.close !== false) ? options.close_button_template || default_close_button_template : '',
        default_icon_template = `<md-icon class="fg-red-A400" md-svg-src="/${options.icon}.svg"></md-icon>`,
        icon_template = (options.icon !== false) ? options.default_icon_template || default_icon_template : '';

    return `
      <md-toast class="md-action with-right-aligned-action" layout="row" layout-align="space-between-center">
        ${icon_template}
        <div flex="5"></div>
        <div style="padding: 5px 0;">${action_text}</div>
        <div flex></div>
        ${close_button_template}
      </md-toast>
    `;
  },
  Success(action_text='Success', _options={}) {
    let options = _.merge({ progress_indicator: true, icon: 'checkmark2' }, _options),
        default_close_button_template = `<md-button class="md-icon-button"><md-icon class="fg-grey-A100 on-hover-fg-green-A400" ng-click="${options.close}" md-svg-src="/close.svg"></md-icon></md-button>`,
        close_button_template = (options.close !== false) ? options.close_button_template || default_close_button_template : '',
        default_icon_template = `<md-icon class="fg-green-A400" md-svg-src="/${options.icon}.svg"></md-icon>`,
        icon_template = (options.icon !== false) ? options.default_icon_template || default_icon_template : '';

    return `
      <md-toast class="md-action with-right-aligned-action" layout="row" layout-align="space-between-center">
        ${icon_template}
        <div flex="5"></div>
        <div style="padding: 5px 0;">${action_text}</div>
        <div flex></div>
        ${close_button_template}
      </md-toast>
    `;
  }
}
