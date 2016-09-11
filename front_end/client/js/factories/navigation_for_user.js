import _ from  'lodash';

const TOP_LEVEL_ROUTES = {
  dashboard: {
    icon: "/home2.svg",
    sref: "dashboard",
    label: "Dashboard",
    state_name: "dashboard",
    visibleIf(user) { return true; }
  },
  surveys: {
    icon: "/pencil.svg",
    sref: "surveys",
    label: "Surveys",
    state_name: "surveys",
    visibleIf(user) { return user.can('read', 'survey') }
  },
  reports: {
    icon: "/pie-chart.svg",
    sref: "reports",
    label: "Reports",
    state_name: "reports",
    visibleIf(user) { return user.can('read', 'report') }
  },
  participants: {
    icon: "/user.svg",
    sref: "participants",
    label: "Participants",
    state_name: "participants",
    visibleIf(user) { return user.can('read', 'participant') }
  },
  groups: {
    icon: "/users.svg",
    sref: "groups",
    label: "Groups",
    state_name: "groups",
    visibleIf(user) { return user.can('read', 'group') }
  },
  triggers: {
    icon: "/target.svg",
    sref: "triggers",
    label: "Triggers",
    state_name: "triggers",
    visibleIf(user) { return user.can('read', 'trigger') }
  },
  settings: {
    icon: "/cog.svg",
    sref: 'settings',
    label: "Settings",
    state_name: "settings",
    visibleIf(user) { return user.isOrganizationAdmin() }
  }
}

export default /* @ngInject */ function() {
  class NavigationForUser {
    constructor(user){
      let self = this;

      _.each(this.itemsAccessibleByUser(user), function(item){
        self.add(item.state_name, item);
      });
    }

    itemsAccessibleByUser(user) {
      return _.filter(TOP_LEVEL_ROUTES, function(item, key){
        return item.visibleIf(user);
      });
    }

    add(name, item) {
      this[name] = item;
      return this;
    }
  }

  return NavigationForUser;
}
