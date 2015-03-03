import defaultFor from 'trailblazer/utils/default-for';
import wrapBuffer from 'trailblazer/utils/wrap-buffer';

export default function(options) {
  var className = defaultFor(options.hash.class, '');
  var open = '<div class="content ' + className + '">';
  var close = '</div>';

  return wrapBuffer(open, close, options, this);
}
