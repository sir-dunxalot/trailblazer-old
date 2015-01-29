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
      return moment().add(1, 'M').toDate();
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
});
