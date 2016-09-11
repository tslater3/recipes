import _ from 'lodash';

export default /* @ngInject */ function(restmod) {
  return restmod.mixin({
    $extend: {
      Scope: {
        selected_record: null,
        isSelected: function(record) {
          return (this.selected_record.$pk == record);
        },
        lastRecordIndex: function() {
          return this.length - 1;
        },
        selectRecord: function(record){
          var record_index = this.findRecordIndexByPk(record);

          this.selected_record = this[record_index];
        },
        selectOrAddRecord(record) {
          let self = this,
              record_index = self.findRecordIndexByPk(record);

          if(record_index > -1) {
            self.selected_record = self[record_index];
          } else {
            self.$buildRaw(record).$reveal();
            self.selected_record = record;
          }
        },
        selectRecordByIndex: function(index) {
          this.selected_record = this[index];
        },
        selectFirstRecord: function() {
          this.selected_record = this[0];
        },
        selectNextRecord: function() {
          this.selected_record = this[this.nextRecordIndex()];
        },
        selectPreviousRecord: function() {
          this.selected_record = this[this.previousRecordIndex()];
        },
        previousRecordIndex: function() {
          var self = this;

          if(self.selectedRecordIsFirst()){
            return self.length - 1;
          } else {
            return self.selectedRecordIndex() - 1;
          }
        },
        findRecordIndexByPk: function(record) {
          var self = this;

          return _.findIndex(self, function(item) {
            return item.$pk == record.$pk;
          });
        },
        selectedRecordIndex: function() {
          var self = this;

          return self.findRecordIndexByPk(self.$pk);
        },
        selectedRecordIsFirst: function() {
          return (this.selectedRecordIndex() === 0);
        },
        selectedRecordIsLast: function() {
          return (this.selectedRecordIndex() === this.lastRecordIndex());
        },
        nextRecordIndex: function() {
          var self = this;

          if(self.selectedRecordIsLast()) {
            return 0;
          } else {
            return self.selectedRecordIndex() + 1;
          }
        }
      }
    }
  });
}
