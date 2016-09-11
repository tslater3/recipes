import _ from  'lodash';

function sanitizeCSVName(name) {
  if (/^[A-Za-z0-9]+\.csv$/.test(name)) {
    return name;
  }
  if (/^[A-Za-z0-9]+/.test(name)) {
    return name + ".csv";
  }
  throw new Error("Invalid title for CSV file : " + name);
}

function csvToURL(content) {
  var blob;
  blob = new Blob([content], {type: 'text/csv'});
  return (window.URL || window.webkitURL).createObjectURL(blob);
};

export default /* @ngInject */ function($timeout) {
  class CsvBlob {
    constructor(title, content){
      this.title = title;
      this.content = content;
    }

    set content(val) {
      this._content = val;
      this._url = csvToURL(val);
    }

    get content() {
      return this._content;
    }

    get url() {
      return this._url;
    }

    set title(val) {
      this._title = sanitizeCSVName(val);
    }

    get title() {
      return this._title;
    }

    revoke() {
      return (window.URL || window.webkitURL).revokeObjectURL(this.url);
    }

    download() {
      var anchor = document.createElement("a"),
          self = this;

      document.body.appendChild(anchor);
      anchor.style.display = "none";
      anchor.download = this.title;
      anchor.href = this.url;
      anchor.click();

      $timeout(function(){
        self.revoke();
        anchor.remove();
      }, 200);
    }
  }

  return CsvBlob;
}
