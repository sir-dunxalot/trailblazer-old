import DS from 'ember-data';

var attr = DS.attr;
var belongsTo = DS.belongsTo;
var hasMany = DS.hasMany;

export default DS.Model.extend({
  email: attr('string'),
  firstName: attr('string'),
  lastName: attr('string'),
  // TODO - Decide whether to add tasks relationship here
  tasks: hasMany('task', {
    async: true
  }),
  team: belongsTo('team', {
    async: true
  }),

  fullName: function() {
    var firstName = this.get('firstName').capitalize();
    var lastName = this.get('lastName').capitalize();

    return firstName + ' ' + lastName;
  }.property('firstName', 'lastName'),
});
