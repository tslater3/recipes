export default /* @ngInject */ function(ProgressBar, papa, $rootScope) {
  class CsvFileWithProgress {
    constructor(file) {
      var self = this;
      self.file = file;
      self.rows = [];
      self.row_count = 0;
      self.progress = new ProgressBar(0, 0);
      self.countRows();
      self.is_loaded = false;
    }

    set row_count(val) {
      this._row_count = val;
    }

    get row_count() {
      return this._row_count;
    }

    isLoading() {
      return !this.is_loaded;
    }

    isFinishedLoading() {
      return this.is_loaded;
    }

    //in theory this should be really fast and we arent storing the rows in memory
    //this way we can display parsing progress by counting rows
    countRows() {
      var self = this,
          _config = {
            fastMode: true,
            step: function() {
              self.row_count++;
            },
            complete: function(){
              //account for header in row count
              self.progress.total = self.row_count - 1;
              self.parseCsvFile();
            }
          };

      papa.parse(self.file, _config);
    }

    parseCsvFile() {
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
            step: function(row) {
              self.rows.push(row.data[0]);
              self.progress.tick();
            },
            complete: function() {
              self.file = undefined;

              if(!$rootScope.$$phase) {
                $rootScope.$digest();
              }
            },
            error: function(message, file) {
              console.log(message, file);
            },
            download: false,
            skipEmptyLines: false,
            chunk: undefined,
            fastMode: undefined
          };

      papa.parse(this.file, _config);
    }
  }

  return CsvFileWithProgress;
}
