import DS from 'ember-data';
import Ember from 'ember';

const { computed } = Ember;
const { attr, belongsTo } = DS;

export default DS.Model.extend({
  assignee: belongsTo('user', {
    async: true
  }), // TODO - default to session user
  completed: attr('boolean', {
    defaultValue: false
  }),
  createdAt: attr('date', {
    defaultValue: function() {
      return new Date();
    }
  }),
  name: attr('string'),
  notes: attr('string'),
  feature: belongsTo('feature', {
    async: true
  }),
  stage: belongsTo('stage'),
  stageName: computed.readOnly('stage.type.name')
});
