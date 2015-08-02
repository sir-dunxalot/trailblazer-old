import Ember from 'ember';

export function sizeIcon(params/*, hash*/) {
  const size = params[0];
  const max = params[1] || 3;
  const fraction = size / max;

  let iconName = 'progress-empty';

  if (fraction === 1) {
    iconName = 'progress-full';
  } else if (fraction > 0.65) {
    iconName = 'progress-two';
  } else if (fraction > 0.32) {
    iconName = 'progress-one'
  }

  return new Ember.String.htmlSafe(`<span class="icon-${iconName}"></span>`);
}

export default Ember.HTMLBars.makeBoundHelper(sizeIcon);
