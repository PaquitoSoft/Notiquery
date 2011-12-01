;(function($) { 

    // plugin's default options
    var defaults = {

       parent: null, 
       height: 50,
       width: 300,
       visibleTime: 5000, // notifications are visible for 5 seconds by default
       locationVType: 'top',
       locationHType: 'right',
       locationVBase: 10,
       locationHBase: 10,
       notificationsMargin: 5,
       opacityTransitionTime : 500,
       closeRelocationTransitionTime: 500,
       scrollRelocationTransitionTime: 500,
       scrollEffectTimeout: 100,
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

 
    // here it goes!
    var notiquery = function(method) {
 
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
                console.time("init");
                // the plugin's final properties are the merged default
                // and user-provided properties (if any)
                // this has the advantage of not polluting the defaults,
                // making the same instace re-usable with
                // new options; thanks to Steven Black for suggesting this
                settings = $.extend({}, defaults, options);
                
                if (!settings.parent) settings.parent = $('body').last();
                
                console.dir(settings.parent);
                //settings.parent.scroll(function() {
                $(window).scroll(function() {
                    console.log("Se ha movido el scroll de la pagina!");
                    clearTimeout(settings.scrollTimeout);
                    settings.scrollTimeout = setTimeout(helpers.scrollEventHandler, settings.scrollEffectTimeout);
                });
                console.timeEnd("init");
            },
 
            // This will be the main function
            show: function(options) {
                console.time("public_show");
                // Initialize settings if this is the first call and user didn't configure the plugin
                //if (!settings.visibleTime) settings = $.extend({}, defaults);
                if (!settings.visibleTime) methods.init(options);
 
                // We first create the element
                var el = helpers.createNotiEl();
                
                // Configure the element with received options
                helpers.configureEl(el, options);
                
                // Show the element
                helpers.show(el, options);
 
                console.timeEnd("public_show");
            }
 
        };
 
        // private methods
        var helpers = {
 
            // This method creates instances of the DOM element holding the notification
            createNotiEl: function() {
                console.time("createNotiEl");
 
                // Let's create the notification element and set its default configuration
                var newEl = $("<div class='notiquery'><span class='title'></span><div class='message'></div></div>");
                newEl.css({                    
                    'width': settings.width/*,
                    'height': settings.height*/
                });
                newEl.css(settings.locationVType, settings.locationVBase);
                newEl.css(settings.locationHType, settings.locationHBase);
                $.data(newEl, 'id', $.now());                
                newEl.click(function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    helpers.hide(newEl);
                });
                
                
                // We need to create a wrapper to handle the way it's added to the DOM hidden and the it's shown
                var wrapper = $("<div class='notiquery_wrapper'></div>");
                (settings.parent || $('body').last()).append(wrapper);
                wrapper.hide();
                wrapper.append(newEl);                
                
                // Add the element to the internal array to keep track of it
                notiEls.push(newEl);
                
                console.timeEnd("createNotiEl");
                return newEl;
            },
            
            /**
            * Function to configure a notification.
            * 
            * @param String title (required) -> Title for the notification
            * @param String message (required) -> Message for the notification
            * @param booleam sticky (optional) -> Whether the notification won't be removed until user interaction (defaults to false)
            * @param int visibleTime (optional) -> Time for the notification to be displayed (in milliseconds). If this isn't provided, the global one will be used.
            * @param int width (optional) -> Width fot the notification (in pixels). If this isn't provided, the global one will be used.
            * @param String customClass (optional) -> Custom class you want to apply to this notification. (It can be a list of classes separated by a white space)
            */
            configureEl: function(notiEl, options) {
                console.time("configureEl");
                
                // Set users params
                notiEl.find('.title').text(options.title);
                notiEl.find('.message').text(options.message);
                notiEl.addClass(options.customClass);
                
                // Check for a custom width
                if (options.width) {
                    notiEl.css('width', options.width);   
                }
                
                // Once the notification is populated, we check to see if there is any link inside so we can
                // configure it in order not to close the notification when it's clicked
                notiEl.find('a').click(function(event) {           
                    event.stopPropagation();
                });
                console.timeEnd("configureEl");
            },
            
            /**
            * Function to actually show a notification.
            * 
            * @param String title (required) -> Title for the notification
            * @param String message (required) -> Message for the notification
            * @param booleam sticky (optional) -> Whether the notification won't be removed until user interaction (defaults to false)
            * @param int visibleTime (optional) -> Time for the notification to be displayed (in milliseconds). If this isn't provided, the global one will be used.
            * @param int width (optional) -> Width fot the notification (in pixels). If this isn't provided, the global one will be used.
            * @param String customClass (optional) -> Custom class you want to apply to this notification. (It can be a list of classes separated by a white space)
            */
            show: function(notiEl, options) {
                console.time("private_show");
                
                var sets = settings;
                if ((notiEls.length - 1) > 0) {
                    
                    // Locate element
                    var lastNot = notiEls[notiEls.length - 2];
                    var basePosition = parseInt(lastNot.css(sets.locationVType), 10) + lastNot.outerHeight() + sets.notificationsMargin;
                    notiEl.css(sets.locationVType, basePosition);
                    
                } else {
                    notiEl.css(sets.locationVType, ((sets.locationVType == 'top') ? '+' : '-') + '=' + sets.parent.scrollTop()); 
                }
                
                // Show element
                notiEl.parent('.notiquery_wrapper').fadeIn(sets.opacityTransitionTime, function() {
                    notiEl.css('height', notiEl.height()); // It seems to me that jQuery does not return its actual height until the element is visible
                    if (sets.onShow) { sets.onShow(newEl); }
                    
                    if (!options.sticky) {
                        setTimeout(function() {
                            helpers.hide(notiEl);
                        }, options.visibleTime || sets.visibleTime);
                    }
                });
                console.timeEnd("private_show");
            },
            
            hide: function(notiEl) {
                console.time("hide");
                
                // Hide notification
                notiEl.parent('.notiquery_wrapper').fadeOut(settings.opacityTransitionTime, function() {
                    var effectProps = {};
                    var emptyHeight = notiEl.outerHeight() + settings.notificationsMargin;
                    
                    // Destroy notification and remove from current notifications array
                    var notiElIndex = helpers.notificationIndex(notiEl);
                    notiEls.splice(notiElIndex, 1);                    
                    notiEl.parent('.notiquery_wrapper').remove();                    
                    
                    // Once the notification is hidden and removed from the DOM, 
                    // we execute the callback
                    if (settings.onClose) settings.onClose();
                        
                    // Relocate other notifications following the closed one
                    if (notiEls.length > 0) {
                        $.each(notiEls.slice(notiElIndex), function(index) {                        
                            effectProps[settings.locationVType] = '-=' + emptyHeight;
                            this.animate(effectProps, settings.closeRelocationTransitionTime);
                        });                        
                    }
                    
                });
                console.timeEnd("hide");
            },
            
            /**
            * Looks for the index of provided notification into the internal 
            * Array we hold with alive notifications.
            * @param notiEl -> notification to look for
            * @return integer -> index of the notification or -1 if it doesn't exists
            */
            notificationIndex: function(notiEl) {
                console.time('notificationIndex');
                var result = -1;
                var id = $.data(notiEl, 'id');                
                $.each(notiEls, function(index) {                    
                    if (id == $.data(this, 'id')) {
                        result = index;
                        return;
                    }
                });
                console.timeEnd('notificationIndex');
                return result;
            },
            
            scrollEventHandler: function() {
                console.time("scrollEventHandler");
                
                var sets = settings;
                var basePos = sets.locationVBase;
                if (sets.locationVType == 'top') {
                    basePos += sets.parent.scrollTop();
                } else {
                    basePos -= sets.parent.scrollTop();
                }
                var effectProps = {};
                $.each(notiEls, function(i, el) {
                    effectProps[sets.locationVType] = basePos;
                    this.animate(effectProps, sets.scrollRelocationTransitionTime);                    
                    basePos += el.outerHeight() + sets.notificationsMargin;                
                });
                
                console.timeEnd("scrollEventHandler");
            }
 
        };
 
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
 
    };
 
    $.extend({ 'notiquery': notiquery });
 
})(jQuery);