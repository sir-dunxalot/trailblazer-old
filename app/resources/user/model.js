import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { attr, belongsTo, hasMany } = DS;

export default DS.Model.extend({
  avatarUrl: attr('string'),
  email: attr('string'),
  firstName: attr('string'),
  githubUserName: attr('string'),
  lastName: attr('string'),
  permissionLevel: attr('number', {
    defaultValue() {
      return 0;
    },
  }),
  tasks: hasMany('task', {
    async: true
  }),
  team: belongsTo('team', {
    async: true
  }),

  fullName: computed('firstName', 'lastName', function() {
    const firstName = this.get('firstName').capitalize();
    const lastName = this.get('lastName').capitalize();

    return `${firstName} ${lastName}`;
  }),

  isAdmin: computed('permissionLevel', function() {
    return this.get('permissionLevel') > 10;
  }),
});
