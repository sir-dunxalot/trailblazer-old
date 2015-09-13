import DirtyRecordHandler from 'ember-easy-form-extensions/mixins/routes/dirty-record-handler';
import Ember from 'ember';

const order = ['research', 'development', 'testing'];

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

    store.findAll('stage-type').then(function(types) {

      types.forEach(function(type, i) {
        const stage = store.createRecord('stage', {
          duration: Math.round(durations[i]),
          feature: model,
          rank: order.indexOf(type.get('name')) + 1,
          type: type
        });

        model.get('stages').addObject(stage);
      });
    }.bind(this));
  },

  beforeModel(transition, params) {
    const _this = this;
    const userId = this.get('userId');

    this._super(transition, params);

    /* If user has team, don't let them create a feature */

    this.store.find('user', userId).then(function(user) {
      user.get('team').then(function(team) {
        if (!team) {
          transition.abort();
          _this.flashMessage('error', 'You cannot create a feature without joining a team');
          _this.transitionTo('user.edit', user, {
            queryParams: {
              highlightInputFor: 'teamId',
              highlightMessage: 'Add your team ID',
            }
          });
        }
      });
    });
  },

  model(params) {
    const feature = {
      team: this.get('curentUser.team'),
    };
    const inBacklog = params.inBacklog;

    if (inBacklog === 'true') {
      feature.inBacklog = true;
    } else if (inBacklog === 'false') {
      feature.inBacklog = false;
    }

    return this.store.createRecord('feature', feature);
  },

});
