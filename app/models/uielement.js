// UIElement is a generic hypermedia driven presentation element for EmberJS
// In theory I should be able to drop in any hypermedia adapter as long as it 
// is capable of creating a UIElement model instance.
export default DS.Model.extend({
  text: DS.attr(),
  className: DS.attr()
});
