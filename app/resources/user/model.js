import DS from 'ember-data';

const { attr, belongsTo, hasMany } = DS;

export default DS.Model.extend({
  avatarUrl: attr('string'),
  email: attr('string'),
  firstName: attr('string'),
  githubUserName: attr('string'),
  lastName: attr('string'),
  tasks: hasMany('task', {
    async: true
  }),
  team: belongsTo('team', {
    async: true
  }),

  fullName() {
    const firstName = this.get('firstName').capitalize();
    const lastName = this.get('lastName').capitalize();

    return `${firstName} ${lastName}`;
  }.property('firstName', 'lastName'),
});
