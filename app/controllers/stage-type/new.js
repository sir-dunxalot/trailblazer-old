import Ember from 'ember';
import Saving from 'trailblazer/mixins/controllers/saving';

export default Ember.ObjectController.extend(
  Saving, {

  save: function() {
    var _this = this;

    this.get('content').save().then(function(/* stageType */) {
      _this.transitionToRoute('index');
    });
  },

});
