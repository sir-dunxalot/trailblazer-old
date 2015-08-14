import Ember from 'ember';
import FlashMessageQueueService from 'ember-flash-messages/services/flash-message-queue';

export default FlashMessageQueueService.extend({
  interval: 4000,
});
