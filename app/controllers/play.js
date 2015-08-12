import Ember from "ember";

export default Ember.Controller.extend({
    // Normalize the nested UI elements into something that the template can parse.

    keyValuePairs: [],

    actions: {
        followLink: function(href, actionType) {
            console.log('here I am guys!');
            console.log(href);
            console.log(actionType);

            // Follow the link, optionally with the kvp data
        }
    }
    
});
