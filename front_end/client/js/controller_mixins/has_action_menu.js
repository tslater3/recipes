const DefaultOptions = {
  open_icon: 'menu',
  close_icon: 'close',
  is_open: false
};

export default /* @ngInject */ function() {
  return {
    included(_options={}) {
      let options = _({}).extend(DefaultOptions).extend(_options).value();

      this.action_menu = {
        is_open: options.is_open,
        toggle() {
          this.is_open = !this.is_open;
        },
        get icon() {
          return !this.is_open ? options.open_icon : options.close_icon;
        }
      };
    }
  };
}
