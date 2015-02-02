import Ember from 'ember';
import wrapBuffer from 'trailblazer/utils/wrap-buffer';

export default function(options) {
  var legend = options.hash.legend;

  Em.assert(
    'You must pass a legend (description) to the form-controls helper',
    legend && Ember.typeOf(legend) === 'string'
  );

  var open = '<fieldset class="controls"><legend>' + legend + '</legend>';
  var close = '</fieldset>';

  return wrapBuffer(open, close, options, this);
};
