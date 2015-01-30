/* global moment */

import DS from 'ember-data';

var attr = DS.attr;
var hasMany = DS.hasMany;

// TODO - date not saving

export default DS.Model.extend({
  createdAt: attr('date', {
    defaultValue: function() {
      return new Date();
    }
  }),
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

  totalDuration: function() {
    var endDate = moment(this.get('endDate'));
    var startDate = moment(this.get('startDate'));

    return endDate.diff(startDate, 'days');
  }.property('startDate', 'endDate'),
});
