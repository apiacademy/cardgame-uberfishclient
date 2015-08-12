import Ember from "ember";

export default Ember.Component.extend({
    tagName: 'span', 
    children: function() {
        return this.get('node.children') ? this.get('node.children') : [];
    }.property('node')
});
