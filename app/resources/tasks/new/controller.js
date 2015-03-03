import Ember from 'ember';
import Saving from 'trailblazer/mixins/controllers/saving';
import uncapitalize from 'trailblazer/utils/uncapitalize';

var computed = Ember.computed;

export default Ember.ObjectController.extend(
  Saving, {

  taskIsInTestingStage: computed.equal('stageName', 'testing'),
  testingStages: computed.filterBy('feature.stages', 'type.name', 'testing'),
  testTaskSelection: Ember.computed.oneWay('testTaskOptionDefault'),
  testTaskOptionNone: {
    name: 'None',
    value: ''
  },
  testTaskOptionDefault: {
      name: 'Unit test',
      value: 'unit'
  },

  testTaskOptions: function() {
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

  testingStage: function() {
    return this.get('testingStages.firstObject');
  }.property('testingStages.[]'),

  transition: function() {
    this.transitionToRoute('feature');
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

        _this.get('feature.content').save().then(function(/* feature */) {
          var isTestingTask = task.get('stageName') === 'testing';

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

  saveTestTasks: function() {
    var _this = this;
    var feature = _this.get('feature');
    var numberOfTasksSaved = 0;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      var testTask = _this.get('testTaskSelection').value;

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
        _this.createTestTask(testTask).save().then(function(task) {
          feature.get('tasks').pushObject(task);

          resolve();
        }, reject);
      }
    });
  },

  createTestTask: function(type) {
    var _this = this;
    var taskName = uncapitalize(_this.get('name'));
    var testTaskName = type.capitalize() + ' test for ' + taskName;

    return _this.store.createRecord('task', {
      name: testTaskName,
      assignee: _this.get('assignee'),
      stage: _this.get('testingStage')
    });
  },

  resetTestingTaskSelection: function() {
    if (this.get('taskIsInTestingStage')) {
      this.set('testTaskSelection', this.get('testTaskOptionNone'));
    }
  }.observes('taskIsInTestingStage'),

  // TODO - remember stage, assignee, and test task

  setDefaultStage: function() {
    var _this = this;

    _this.get('feature.stages').then(function(stages) {
      var stage = stages.objectAt(1);

      _this.set('stage', stage);
    });
  }.observes('stages.[]'),

});
