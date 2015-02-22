/* global moment */

import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr;
var belongsTo = DS.belongsTo;
var hasMany = DS.hasMany;

export default DS.Model.extend({
  createdAt: attr('date', {
    defaultValue: function() {
      return new Date();
    }
  }),
  // Update all places to use this CM
  completedTasks: Ember.computed.filterBy('tasks', 'completed', true),
  endDate: attr('date', {
    defaultValue: function() {
      return moment().add(30, 'days').toDate();
    }
  }),
  name: attr('string'),
  notes: attr('string'),
  stages: hasMany('stage', {
    async: true
  }),
  startDate: attr('date', {
    defaultValue: function() {
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
  totalDuration: function() {
    var endDate = moment(this.get('endDate'));
    var startDate = moment(this.get('startDate'));

    return endDate.diff(startDate, 'days');
  }.property('startDate', 'endDate'),
});
