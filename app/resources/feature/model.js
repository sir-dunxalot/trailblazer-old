/* global moment */

import DS from 'ember-data';
import Ember from 'ember';

const { attr, belongsTo, hasMany } = DS;

export default DS.Model.extend({
  createdAt: attr('date', {
    defaultValue() {
      return new Date();
    }
  }),
  // TODO - update all places to use this CM
  completedTasks: Ember.computed.filterBy('tasks', 'completed', true),
  endDate: attr('date', {
    defaultValue() {
      return moment().add(30, 'days').toDate();
    }
  }),
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

  // TODO - Change to totalDays
  totalDuration() {
    const endDate = moment(this.get('endDate'));
    const startDate = moment(this.get('startDate'));

    return endDate.diff(startDate, 'days');
  }.property('startDate', 'endDate'),
});
