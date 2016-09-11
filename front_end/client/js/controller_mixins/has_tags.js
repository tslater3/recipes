import _ from 'lodash';
import { debounce } from 'lodash';
import { decorate } from 'core-decorators';

class HasTagsClass {
  constructor(_config) {
    _.assign(this, _config);
    this.setTagNamesFromCollection();
    this.search_text = '';
  }

  afterSaveAll() {
    this.refreshTagSuggestions();
    this.refreshCollection();
  }

  highlightSearchText() {
    return _.parameterize(this.search_text);
  }

  selectTag($chip) {
    if($chip.hasOwnProperty('name')) {
      return $chip.name;
    } else {
      return _.parameterize($chip);
    }
  }

  refreshCollection() {
    this.controller.collection.$refresh();
  }

  @decorate(debounce, 2000)
  refreshTagSuggestions() {
    this.tag_suggestions.$refresh();
  }

  setTagNamesFromCollection() {
    this.tag_names = _.pluck(this.controller.collection, 'name').map(value => _.parameterize(value));
  }

  tagAdded(tag_value) {
    let tag_name = _.parameterize(tag_value),
        tag_names = _.pluck(this.controller.collection, 'name');

    if(!_.contains(tag_names, tag_name)) {
      this.controller.collection.$buildRaw({name: tag_name}).$reveal();
      this.setTagNamesFromCollection();
    }
  }

  //after tag removed, refresh suggestions if tag is not new
  tagRemoved(tag_name) {
    let tag = _.find(this.controller.collection, function(record){ return record.name == tag_name}),
        refresh_after_removed = !tag.isNew();

    tag.$destroy();

    if(refresh_after_removed) {
      this.refreshTagSuggestions();
    }
  }

  //filter out tags already applied to record, then show suggestions
  tagSuggestions() {
    let search_text = _.parameterize(this.search_text);

    return this.tag_suggestions
               .$asList()
               .filterBy({name: this.tag_names, _text: true, _not: true})
               .filterBy({name: search_text, _text: true});
  }
}

export default /* @ngInject */ function HasTags(mixin) {
  return {
    included(options) {
      _.requireDefinedProperties(options, 'tag_suggestions');

      mixin.requireOneOf(this, 'Base', 'BaseComponent');

      mixin(this, 'HasCollection', {name: 'tags'});
      mixin(this, 'HasCollectionActions');

      let _config = {
        controller: this,
        tag_suggestions: options['tag_suggestions']
      };

      this.has_tags = new HasTagsClass(_config);
    }
  };
}
