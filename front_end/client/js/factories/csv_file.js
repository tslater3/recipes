import _ from  'lodash';

export default /* @ngInject */ function($rootScope, papa) {
  class CsvFile {
    constructor(file, config = {}) {
      var self = this;
      self.file = file;
      self.errors = [];
      self.config = config;
      self.progress = { current_row: 0 };
      self.is_loaded = false;
    }

    get is_loading() {
      return !this.is_loaded;
    }

    digest() {
      if(!$rootScope.$$phase) {
        $rootScope.$digest();
      }
    }

    // this is so we can do some things by default before passing along the results
    // such as triggering a digest
    get before_callbacks() {
      var self = this;

      return {
        step: function(row){
          self.progress.current_row++;
          self.config.onStep(row);
        },
        complete: function(results) {
          self.file = undefined;
          self.errors = results.errors;
          self.is_loaded = true;
          self.digest();
          self.config.onComplete(results);
        },
        error: function(message) {
          self.errors.push(message);
        }
      }
    }

    parse() {
      var self = this,
          _config = {
            delimiter: "",
            newline: "",
            header: true,
            dynamicTyping: true,
            preview: 0,
            encoding: "",
            comments: false,
            worker: false,
            download: false,
            skipEmptyLines: false,
            fastMode: undefined
          };

      if(_.respondTo(self.config, 'onComplete')) {
        _config.complete = self.before_callbacks.complete;
      }

      if(_.respondTo(self.config, 'onStep')) {
        _config.step = self.before_callbacks.step;
      }

      _config.error = self.before_callbacks.error;

      papa.parse(self.file, _config);

      return self;
    }
  }

  return CsvFile;
}
