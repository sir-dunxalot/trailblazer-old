import Ember from 'ember';
import Saving from 'trailblazer/mixins/controllers/saving';

export default Ember.ObjectController.extend(
  Saving, {

  testingStage: Ember.computed.filterBy('stages', 'type.name', 'testing'),
  testTask: null,
  testTaskSelection: { // Hacky
    name: 'Unit test',
    value: 'unit'
  },
  testTaskOptions: Em.A([
    {
      name: 'None',
      value: ''
    }, {
      name: 'Unit test',
      value: 'unit'
    }, {
      name: 'Integration test',
      value: 'integration'
    }, {
      name: 'Both',
      value: 'both'
    }
  ]),

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

  transition: function() {
    this.transitionToRoute('feature', this.get('feature'));
  },

  cancel: function() {
    this.transition();
  },

  save: function() {
    var _this = this;

    /* Save Task */

    this.get('content').save().then(function(task) {
      _this.get('feature.tasks').pushObject(task);

      _this.saveTestTasks().then(function() {

        /* Save feature */

        _this.get('feature.content').save().then(function(feature) {
          var isTestingTask = task.get('stageName') === 'testing';

          if (_this.get('testTask') && !isTestingTask) {
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

  saveTestTasks: function() {
    var _this = this;
    var feature = _this.get('feature');
    var numberOfTasksSaved = 0;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      var testTask = _this.get('testTask');

      if (!testTask) {
        resolve();
      }

      if (testTask === 'both') {
        ['unit', 'integration'].forEach(function(type) {
          _this.createTestTask(type).save().then(function(task) {
            numberOfTasksSaved++;

            feature.get('tasks').pushObject(task);

            if (numberOfTasksSaved === 2) {
              resolve();
            }
          }, reject);
        });
      } else {
        _this.createTestTask(testTask).save().then(function() {
          feature.get('tasks').pushObject(task);

          resolve();
        }, reject);
      }
    });
  },

  createTestTask: function(type) {
    var _this = this;
    var taskName = type.capitalize() + ' test for ' + _this.get('name');

    return new Ember.RSVP.Promise(function(resolve, reject) {
      _this.store.createRecord('task', {
        name: taskName,
        assignee: _this.get('assignee'),
        stage: _this.get('testingStage')
      });

      resolve();
    });
  },

  setDefaultStage: function() {
    var _this = this;

    _this.get('feature.stages').then(function(stages) {
      var stage = stages.objectAt(1);

      _this.set('stage', stage);
    });
  }.observes('stages.[]'),

});
