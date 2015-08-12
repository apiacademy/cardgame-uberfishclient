import Ember from "ember";

export default Ember.Component.extend({
    tagName: 'span', 

    actions: {
        followLink: function() {
            this.sendAction('followLinkAction', this.get('node.href'), this.get('actionType'));
        }
    }

});
