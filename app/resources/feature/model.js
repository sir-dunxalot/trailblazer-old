/* global moment */

import DS from 'ember-data';
import Ember from 'ember';

const { attr, belongsTo, hasMany } = DS;
const { computed } = Ember;

let endOfBacklog = 999;

export default DS.Model.extend({
  createdAt: attr('date', {
    defaultValue() {
      return new Date();
    }
  }),
  backlogPosition: attr('number', {
    defaultValue() {
      endOfBacklog++;

      return endOfBacklog;
    },
  }),
  // TODO - update all places to use this CM
  completedTasks: computed.filterBy('tasks', 'completed', true),
  endDate: attr('date', {
    defaultValue() {
      return moment().add(30, 'days').toDate();
    }
  }),
  inBacklog: attr('boolean'),
  name: attr('string'),
  notes: attr('string'),
  stages: hasMany('stage', {
    async: true
  }),
  startDate: attr('date', {
    defaultValue() {
      return new Date();
    }
  }),
  tasks: hasMany('task', {
    async: true
  }),
  team: belongsTo('team', {
    async: true
  }),

  totalDuration: computed('startDate', 'endDate', function() {
    const endDate = moment(this.get('endDate'));
    const startDate = moment(this.get('startDate'));

    return endDate.diff(startDate, 'days');
  }),
});
