import Ember from 'ember';
import wrapBuffer from 'trailblazer/utils/wrap-buffer';

export default function(options) {
  var open = '<div class="headline">';
  var close = '</div>';

  return wrapBuffer(open, close, options, this);
};
