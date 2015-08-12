import Ember from "ember";

export default Ember.Component.extend({
    tagName: function() {
        var nodeType = this.get('node.type');
        if( nodeType === 'container') {
            return 'div';
        } else if( nodeType === 'link' ) {
            return 'button';
        } else if( nodeType === 'image' ) {
            return 'img';
        } else {
            return 'span';
        }
    }.property('node'),
    attributeBindings: ['href','src'],
       href: function() {
           console.log('href...');
           return this.get('node.href')
       }.property('node.href'),
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
   }.property(),
    didInsertElement: function() {
    },
    isContainer: function() {
        console.log(this.get('node.type'));
        console.log(this.get('node.type') === 'container');
        return (this.get('node.type') === 'container');
    }.property('node'),
    children: function() {
        return this.get('node.children') ? this.get('node.children') : [];
    }.property('node'),
    actions: {
        followLink: function(href, actionType) {
            this.sendAction('followLinkAction', href, actionType);
        }
    }
});
