import Ember from "ember";

export default Ember.Component.extend({
    tagName: 'span', 
    valueProperty: '',
    valueChanged: function() {
        // Set the property in the controller's key value pair
        var kvpList = this.get('keyValuePair');
        var name = this.get('node.name');
        var kvp = kvpList.findBy('name', name);

        if( !kvp ) {
            kvp = {name: name, value: this.get('valueProperty')}
            kvpList.pushObject(kvp);
        }else {
            var valueProp = this.get('valueProperty');
            Ember.set(kvp, 'value', valueProp);
        }

        

    }.observes('valueProperty'),
    



    actions: {
    }

});
