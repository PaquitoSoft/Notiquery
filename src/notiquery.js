;(function($) {
 
    // here it goes!
    $.fn.notiquery = function(method) {
 
        // plugin's default options
        var defaults = {
 
           parent: '', // This value needs to be set into the initializer
           height: 50,
           width: 300,
           visibleTime: 5000, // notifications are visible for 5 seconds by default
           locationVType: 'top',
           locationHType: 'right',
           locationVBase: 10,
           locationHBase: 10,
           notificationsMargin: 5,
           opacityTransitionTime : 750,
           closeRelocationTransitionTime: 750,
           scrollRelocationTransitionTime: 500,
           notificationOpacity : 0.95 
           //onShow: callback,
           //onClose: callback 
 
        };
 
        // this will hold the merged default and user-provided properties
        // you will have to access the plugin's properties through this object!
        // settings.propertyName
        var settings = {};
 
        // Here we will hold the notification elements we'll need to create
        // ¿We will always have at least one so the first notification is showed ASAP?
        var notiEls = [];
 
        // public methods
        // to keep the $.fn namespace uncluttered, collect all
        // of the plugin's methods in an object literal and call
        // them by passing the string name of the method to the plugin
        //
        // public methods can be called as
        // $(selector).pluginName('methodName', arg1, arg2, ... argn)
        // where "pluginName" is the name of your plugin and "methodName"
        //is the name of a function available in
        // the "methods" object below;
        // arg1 ... argn are arguments to be passed to the method
        //
        // or, from within the plugin itself, as
        // methods.methodName(arg1, arg2, ... argn)
        // where "methodName" is the name of a function available
        // in the "methods" object below
        var methods = {
 
            // this the constructor method that gets called when
            // the object is created
            init : function(options) {
 
                // the plugin's final properties are the merged default
                // and user-provided properties (if any)
                // this has the advantage of not polluting the defaults,
                // making the same instace re-usable with
                // new options; thanks to Steven Black for suggesting this
                settings = $.extend({}, defaults, options);
                                
            },
 
            // This will be the main function
            show: function(options) {
 
                // We first create the element
                
                // Configure the element with received options
                
                // Show the element
 
            }
 
        }
 
        // private methods
        // these methods can be called only from within the plugin
        //
        // private methods can be called as
        // helpers.notiquery(arg1, arg2, ... argn)
        // where "methodName" is the name of a function available in
        // the "helpers" object below; arg1 ... argn are arguments to
        // be passed to the method
        var helpers = {
 
            // This method creates instances of the DOM element holding the notification
            createNotiEl: function() {
 
                // code goes here
 
            },
            
            show: function(notiEl) {
             
            },
            
            hide: function(notiEl) {
             
            },
            
            destroy: function(notiEl) {
             
            }
 
        }
 
        // if a method as the given argument exists
        if (methods[method]) {
 
            // call the respective method
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
 
        // if an object is given as method OR nothing is given as argument
        } else if (typeof method === 'object' || !method) {
 
            // call the initialization method
            return methods.init.apply(this, arguments);
 
        // otherwise
        } else {
 
            // trigger an error
            $.error( 'Method "' +  method + '" does not exist in notiquery plugin!');
 
        }
 
    }
 
})(jQuery);