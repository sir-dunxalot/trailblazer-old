import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  features: hasMany('feature', {
    async: true
  }),
  name: attr('string'),
  members: hasMany('user', {
    async: true
  })
});
