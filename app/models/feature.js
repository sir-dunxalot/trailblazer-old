import DS from 'ember-data';

var attr = DS.attr;
var hasMany = DS.hasMany;

export default DS.Model.extend({
  createdAt: attr('date', {
    defaultValue: function() {
      return new Date();
    }
  }),
  end: attr('date'),
  name: attr('string'),
  notes: attr('string'),
  stages: hasMany('stage'),
  start: attr('date'),
  tasks: hasMany('task', {
    async: true
  }),

  // seedStages: function() {
  //   this.set('stages', [1,2,3])
  // }.on('didCreate'),
});
