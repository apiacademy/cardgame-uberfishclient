import Ember from "ember";

export default Ember.Component.extend({
    tagName: 'img', 
    attributeBindings: ['src'],
   src: function() {
       console.log('href...');
       return this.get('node.src')
   }.property('node.href'),
   classNameBindings: ['classList'],
   classList: function() {
       if( !this.get('node.classNames') ) {
           return '';
       }else {
           return this.get('node.classNames');
       }
   }.property()
});
