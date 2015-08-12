import Ember from "ember";

export default Ember.Route.extend({

  model: function() {
      return uberAdapter.get('http://academy.messages.io:5000/'); 
  }
});
