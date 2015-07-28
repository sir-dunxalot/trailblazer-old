import Ember from 'ember';
import FlashMessageComponent from 'ember-flash-messages/components/flash-message';

const { run } = Ember;

export default FlashMessageComponent.extend({

  _hideEndingQueue: Ember.on('willInsertElement', function() {
    const queue = this.get('flashMessageQueue');

    /* If this message is in the timed queue we might
    need to hide the message before it's removed from
    the queue, but only if there are no other messages
    in the queue. */


    if (queue && this.get('duration') !== 0) {
      queue.on('willHideQueue', this, function() {
        const queueLength = queue.get('timedMessages.length');

        /* If there is not another message queued, start
        hiding the queue */

        if (queueLength === 1) {
          this.setVisibility(false);
        }

        /* However, check to see if another message has been
        added in the interim and, if so, cancel the hiding of
        the queue */

        /* TODO - Remove 0.9, which allows for small margin for error */

        run.later(this, function() {
          if (queueLength > 1) {
            this.setVisibility(true);
          }
        }, this.get('animationDuration') * 0.9);
      });
    }
  }),

});
