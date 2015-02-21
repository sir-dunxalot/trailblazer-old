import Ember from 'ember';

export default Ember.CollectionView.extend({
  classNames: ['roadmap_features'],
  itemViewClass: 'feature/list-item',
  tagName: 'ul'
});
