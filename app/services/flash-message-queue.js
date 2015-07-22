import Ember from 'ember';
import FlashMessageQueueService from 'ember-flash-messages/services/flash-message-queue';

const { run } = Ember;

export default FlashMessageQueueService.extend({
  interval: 4000,
});
