import Ember from 'ember';
import NotificationMessageComponent from 'ember-cli-notifications/components/notification-message';

const { computed } = Ember;

export default NotificationMessageComponent.extend({

  notificationIcon: computed('notification.type', function() {
    switch (this.get('notification.type')) {
      case 'info':
        return 'icon-info';
      case 'success':
        return 'icon-success';
      case 'warning':
        return 'icon-warning';
      case 'error':
        return 'icon-error';
    }
  }),

});
