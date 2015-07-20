import DirtyRecordHandler from 'ember-easy-form-extensions/mixins/routes/dirty-record-handler';
import Ember from 'ember';

export default Ember.Route.extend(
  DirtyRecordHandler, {

  // undoStageCreation: function() {
  //   var stages = this.get('controller.content.stages');

  //   stages.forEach(function(stage) {
  //     if (stage.get('isDirty')) {
  //       stage.deleteRecord();
  //     }
  //   })
  // }.on('willTransition'),

  afterModel(model) {
    const store = this.store;
    const duration = model.get('totalDuration');
    const durations = [
      duration * 0.2,
      duration * 0.6,
      duration * 0.2
    ];

    store.findAll('stage-type', { reload: true }).then(function(types) {

      types.forEach(function(type, i) {
        const stage = store.createRecord('stage', {
          duration: Math.round(durations[i]),
          feature: model,
          type: type
        });

        model.get('stages').addObject(stage);
      });
    }.bind(this));
  },

  beforeModel(transition, queryParams) {
    const userId = this.get('userId');

    this._super(transition, queryParams);

    /* If user has team, don't let them create a feature */

    this.store.findRecord('user', userId).then(function(user) {
      if (!user.get('team')) {
        transition.abort();
        this.transitionTo('user.edit', user);
      }
    }.bind(this));
  },

  model() {
    return this.store.createRecord('feature', {
      team: this.get('curentUser.team')
    });
  },

});
