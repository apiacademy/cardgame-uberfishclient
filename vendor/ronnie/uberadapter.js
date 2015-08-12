/* global uberAdapter */


var uberAdapter = (function (){
    //var url = "https://rawgit.com/apiacademy/cardgame-uberfishbot/master/samples/game-state.js";

    // Private

    function safe(callback) {
        $.get( url, function( data ) {
          $( ".result" ).html( data );
            return parseUber(data);
        });
        
    }

    function parseUber(data, callback) {
        var UIElements = [];

        var uber = data.uber;
        for( var i = 0; i < uber.data.length; i++ ) {
            UIElements.push(parseUberData(uber.data[i]));
        }
        return UIElements;
    }


    //TODO: move the componentName binding to the Ember Controller

    function parseUberData(data, parentElementType) {
        var container = {type: 'container'};
        container.children = [];
        container.componentName = 'uicontainer-node';
        var dataParser = UberDataParserSelector(data, parentElementType);
        container.children = container.children.concat(dataParser(data));

        var lastChild = container.children[container.children.length-1];
        var parentType = null;
        if(lastChild) { parentType =  lastChild.type } 
        
        for( var i = 0; data.data && i < data.data.length; i++ ) {
            container.children = container.children.concat(parseUberData(data.data[i], parentType));
        }
        return container;
    }

    function UberDataParserSelector(data, parentElementType) {
        var selector = createLabel;
        if( data.url ) { selector = createLink; }
        if( parentElementType === 'link' ) {
            selector = createField;
        }
        return selector;

    }

    function createField(data) {
        var UIElements = [];
        var labelEl = {type: 'label'};
        labelEl.text = data.name;
        labelEl.text = labelEl.text + ':';
        labelEl.classNames = ['label'];
        labelEl.componentName = 'uilabel-node';
        UIElements.push(labelEl);
        var inputEl = {type: 'field'};
        inputEl.componentName = 'uifield-node';
        inputEl.name = data.name;
        inputEl.value = data.value;
        UIElements.push(inputEl);
        return UIElements;
    }

    function createLabel(data) {
        var UIElements = [];
        var labelEl = {type: 'label'};
        labelEl.text = data.name;
        labelEl.classNames = ['label'];
        labelEl.componentName = 'uilabel-node';
        if( data.label) { labelEl.text = data.label; }
        UIElements.push(labelEl);
        if( data.value ) {
            var valueEl = {type: 'label'};
            valueEl.text = data.value;
            valueEl.classNames = ['value'];
        valueEl.componentName = 'uilabel-node';
            UIElements.push(valueEl);
        }
        return UIElements;
    }

    function createLink(data) {
        var UIElements = [];

        // If transclusion is on, just make this an image
        // TODO inspect the media type to decide
        if( data.transclude === 'true' ) {
            console.log('transclude!');
            var imageEl = {type: 'image'};
            imageEl.src = data.url;
            imageEl.componentName = 'uiimage-node';
            UIElements.push(imageEl);
        } else {
            // Note: the children of a link become form fields
            var linkEl = {type: 'link'};
            linkEl.text = data.name;
            linkEl.componentName = 'uibutton-node';
            if( !data.action ) { linkEl.actionType = 'read' }
            else { linkEl.actionType = data.action; }
            if( data.label) { linkEl.text = data.label; }
            linkEl.href = data.url;
            // If the link doesn't have readable text, throw it away.
            if( linkEl.text ) {
                UIElements.push(linkEl);
            }
        }
        return UIElements;
    }

    // Public Functions

    return {
        poll: function() {
        },
        // Returns an array of UI elements
        get: function(url) {
            return new Ember.RSVP.Promise(function(resolve, reject) {
var getAJAX = $.ajax({
        url: url,
        type: 'GET',                    
        dataType: "json",
    });
                
    getAJAX.done( function( data, textStatus, jqXHR ) {                    
        resolve(parseUber(data));
    });
    
    getAJAX.fail( function( data, textStatus, jqXHR ) {
        console.log('fail');
        console.log(textStatus);
        console.log(jqXHR);
    });

            });
        },
        submit: function(params) {
        }
    }
}());

