import Ember from 'ember';
import FormMixin from 'ember-easy-form-extensions/mixins/controllers/form';
import uncapitalize from 'trailblazer/utils/uncapitalize';

const { computed } = Ember;

export default Ember.Controller.extend(
  FormMixin, {

  taskIsInDevelopmentStage: computed.equal('model.stageName', 'development'),
  testTaskOptionDefault: {
    name: 'Unit and integration tests',
    value: 'both'
  },

  testTaskOptions: computed(function() {
    return Ember.A([
      {
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
  },

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
    const model = this.get('model');

    /* Save Task */

    model.save().then(function(task) {

      /* Save the test task(s) if they exist */

      _this.saveTestTasks().then(function() {
        task.get('feature').then(function(feature) {
          const stage = task.get('stage');

          [feature, stage].forEach(function(property) {
            property.get('tasks').addObject(task);
          });

          stage.save().then(function() {
            feature.save().then(function() {
              _this.transition();
            });
          });
        });
      });
    });
  },

  saveTestTasks() {
    const _this = this;
    const model = this.get('model');

    let numberOfTasksSaved = 0;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      const testTask = _this.get('testTaskSelection');

      if (!testTask) {
        return resolve();
      }

      model.get('feature').then(function(feature) {
        const testTaskValue = testTask.value; // POJO

        feature.get('stages').then(function(stages) {

          stages.findBy('type.name', 'testing').save().then(function(testingStage) {

            if (testTaskValue === 'both') {
              ['unit', 'integration'].forEach(function(type) {
                _this.createTestTask(type, testingStage).save().then(function(task) {
                  numberOfTasksSaved++;

                  feature.get('tasks').pushObject(task);

                  if (numberOfTasksSaved === 2) {
                    resolve();
                  }
                }, reject);
              });
            } else {
              _this.createTestTask(testTaskValue, testingStage).save().then(function(task) {
                feature.get('tasks').pushObject(task);

                resolve();
              }, reject);
            }
          });
        });
      });
    });
  },

  createTestTask(type, testingStage) {
    const taskName = uncapitalize(this.get('model.name'));
    const testTaskName = type.capitalize() + ' test for ' + taskName;

    return this.store.createRecord('task', {
      name: testTaskName,
      assignee: this.get('model.assignee'),
      feature: this.get('model.feature'),
      stage: testingStage,
    });
  },

  // TODO - remember stage, assignee, and test task

});
