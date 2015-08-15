import Ember from 'ember';
import FormMixin from 'ember-easy-form-extensions/mixins/controllers/form';
import uncapitalize from 'trailblazer/utils/uncapitalize';

const { computed, observer, on } = Ember;

export default Ember.Controller.extend(
  FormMixin, {

  lastUsedStageName: null,
  taskIsInDevelopmentStage: computed.equal('model.stageName', 'development'),
  testingStages: computed.filterBy('model.feature.stages', 'type.name', 'testing'),
  testTaskOptionDefault: {
    name: 'Unit and integration tests',
    value: 'both'
  },

  testTaskOptions: computed(function() {
    return Ember.A([
      {
        name: 'None',
        value: null
      }, {
        name: 'Unit test',
        value: 'unit'
      }, {
        name: 'Integration test',
        value: 'integration'
      },
      this.get('testTaskOptionDefault'),
    ]);
  }),

  validations: {
    'model.assignee': {
      presence: true
    },

    'model.name': {
      presence: true
    },

    'model.stage': {
      presence: true
    },

    'testTaskSelection': {
      presence: true
    }
  },

  testingStage: computed('testingStages.[]', function() {
    return this.get('testingStages.firstObject');
  }),

  testTaskSelection: computed('taskIsInDevelopmentStage', {
    get() {
      if (!this.get('taskIsInDevelopmentStage')) {
        return null; // Remove any selection
      } else {
        return this.get('testTaskOptionDefault');
      }
    },

    set() {

    },
  }),

  transition() {
    this.transitionToRoute('feature');
  },

  cancel() {
    this.transition();
  },

  save() {
    const _this = this;

    /* Save Task */

    this.get('model').save().then(function(task) {
      _this.get('model.feature.tasks').pushObject(task);

      _this.set('lastUsedStageName', task.get('stage.type.name'));

      _this.saveTestTasks().then(function() {

        /* Save feature */

        _this.get('model.feature.content').save().then(function(/* feature */) {
          const isTestingTask = task.get('stageName') === 'testing';

          if (_this.get('testTaskSelection') && !isTestingTask) {
            _this.get('testingStage').save().then(function() {
              _this.transition();
            });
          } else {
            task.get('stage').save().then(function() {
              _this.transition();
            });
          }
        });
      });
    });
  },

  saveTestTasks() {
    const feature = this.get('model.feature');

    let numberOfTasksSaved = 0;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      var testTask = this.get('testTaskSelection').value;

      if (!testTask) {
        resolve();
      }

      if (testTask === 'both') {
        ['unit', 'integration'].forEach(function(type) {
          this.createTestTask(type).save().then(function(task) {
            numberOfTasksSaved++;

            feature.get('tasks').pushObject(task);

            if (numberOfTasksSaved === 2) {
              resolve();
            }
          }, reject);
        }, this);
      } else {
        this.createTestTask(testTask).save().then(function(task) {
          feature.get('tasks').pushObject(task);

          resolve();
        }, reject);
      }
    }.bind(this));
  },

  createTestTask(type) {
    const taskName = uncapitalize(this.get('model.name'));
    const testTaskName = type.capitalize() + ' test for ' + taskName;

    return this.store.createRecord('task', {
      name: testTaskName,
      assignee: this.get('model.assignee'),
      feature: this.get('model.feature'),
      stage: this.get('testingStage')
    });
  },

  // TODO - remember stage, assignee, and test task

});
