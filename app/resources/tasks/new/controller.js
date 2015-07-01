import Ember from 'ember';
import Saving from 'ember-easy-form-extensions/mixins/controllers/saving';
import uncapitalize from 'trailblazer/utils/uncapitalize';

const { computed } = Ember;

export default Ember.ObjectController.extend(
  Saving, {

  taskIsInTestingStage: computed.equal('stageName', 'testing'),
  testingStages: computed.filterBy('feature.stages', 'type.name', 'testing'),
  testTaskSelection: computed.oneWay('testTaskOptionDefault'),
  testTaskOptionNone: {
    name: 'None',
    value: ''
  },
  testTaskOptionDefault: {
      name: 'Unit test',
      value: 'unit'
  },

  testTaskOptions() {
    return Ember.A([
      this.get('testTaskOptionNone'),
      this.get('testTaskOptionDefault'),
      {
        name: 'Integration test',
        value: 'integration'
      }, {
        name: 'Both',
        value: 'both'
      }
    ]);
  }.property('testTaskOptionNone', 'testTaskOptionDefault'),

  validations: {
    stage: {
      presence: true
    },

    name: {
      presence: true
    },

    assignee: {
      presence: true
    },

    testTaskSelection: {
      presence: true
    }
  },

  testingStage() {
    return this.get('testingStages.firstObject');
  }.property('testingStages.[]'),

  transition() {
    this.transitionToRoute('feature');
  },

  cancel() {
    this.transition();
  },

  save() {
    var _this = this;

    /* Save Task */

    this.get('content').save().then(function(task) {
      _this.get('feature.tasks').pushObject(task);

      _this.saveTestTasks().then(function() {

        /* Save feature */

        _this.get('feature.content').save().then(function(/* feature */) {
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
    const feature = _this.get('feature');

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
    const taskName = uncapitalize(this.get('name'));
    const testTaskName = type.capitalize() + ' test for ' + taskName;

    return this.store.createRecord('task', {
      name: testTaskName,
      assignee: _this.get('assignee'),
      stage: this.get('testingStage')
    });
  },

  resetTestingTaskSelection() {
    if (this.get('taskIsInTestingStage')) {
      this.set('testTaskSelection', this.get('testTaskOptionNone'));
    }
  }.observes('taskIsInTestingStage'),

  // TODO - remember stage, assignee, and test task

  setDefaultStage() {
    this.get('feature.stages').then(function(stages) {
      const stage = stages.objectAt(1);

      this.set('stage', stage);
    }.bind(this));
  }.observes('stages.[]'),

});
