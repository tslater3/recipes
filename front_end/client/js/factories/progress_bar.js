import _ from  'lodash';

export default /* @ngInject */ function() {
  class ProgressBar {
    constructor(start = -1, total = 0, event_routing_key = false) {
      this.total = total;
      this.event_routing_key = event_routing_key;
      this.current_step = start;
      this._is_finished = false;
    }

    get formatted_progress() {
      return `${this.current_step} / ${this.total}`;
    }

    get formatted_progress_as_percentage() {
      return `${this.percent} / 100`;
    }

    get percent() {
      return ((this.current_step / this.total) * 100).toFixed(2) * 1;
    }

    get percent_complete_value() {
      return ((this.current_step / this.total).toFixed(2) * 1);
    }

    get percent_complete() {
      return _.toPercentage(this.percent_complete_value).toFixed(2) * 1;
    }

    get is_finished() {
      return (this.current_step >= this.total);
    }

    get is_not_finished() {
      return !this.is_finished;
    }

    get is_loading() {
      return this.is_not_finished;
    }

    set current_step(val) {
      this._current_step = val;

      if(val >= this.total) {
        this.is_finished = true;
      }
    }

    get current_step() {
      return this._current_step;
    }

    set is_finished(val) {
      this._is_finished = val;
    }

    get is_completed() {
      return this.is_finished;
    }

    tick() {
      this.current_step++;
      return this;
    }

    set total(val) {
      this._total = val;
    }

    get total() {
      return this._total;
    }

    increment() {
      return this.tick();
    }

  }

  return ProgressBar;
}
