;(function($) { 

    // plugin's default options
    var defaults = {

       parent: null, 
       height: 50,
       width: 300,
       visibleTime: 5000, 
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

    // Default properties merged with user provided ones
    var settings = {};

    // Here we will hold the notification elements we'll need to create
    var notiEls = [];

    // here it goes!
    var notiquery = function(method) {
 
        // Public methods
        var methods = {
 
            // this the constructor method that gets called when
            // the object is created
            init : function(options) {
				var firstCall = !settings.visibleTime;
                settings = $.extend({}, defaults, options);
                
                // Ensure parent
	            if (!settings.parent) settings.parent = $('body').last();
                
                // If you change plugin options I remove previous notifications
                $.each(notiEls, function(notiEl) {
            		this.parent('.notiquery_wrapper').remove();
            	});
            	notiEls = [];
                
                // Do not add the same handle to scroll event everytime a user update plugin options
                if (firstCall) {                	
					// Handle scrolling
        	        $(window).scroll(function() {
            	        clearTimeout(settings.scrollTimeout);
                	    settings.scrollTimeout = setTimeout(helpers.scrollEventHandler, settings.scrollEffectTimeout);
	                });	
                }            
            },
 
            // This will be the main function
            show: function(options) {
                // Initialize settings if this is the first call and user didn't configure the plugin
                if (!settings.visibleTime) methods.init(options);
 
                // We first create the element
                var el = helpers.createNotiEl();
                
                // Configure the element with received options
                helpers.configureEl(el, options);
                
                // Show the element
                helpers.show(el, options);
            }
 
        };
 
        // private methods
        var helpers = {
 
            /** 
             * This method creates instances of the DOM element holding the notification
             */
            createNotiEl: function() {
 
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
            },
            
            /**
             * Here is where we handle notification hide effect
             */
            hide: function(notiEl) {
                var emptyHeight = notiEl.outerHeight() + settings.notificationsMargin;
                
                // Hide notification
                notiEl.parent('.notiquery_wrapper').fadeOut(settings.opacityTransitionTime, function() {
                    var effectProps = {};
                    
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
            },
            
            /**
            * Looks for the index of provided notification into the internal 
            * Array we hold with alive notifications.
            * @param notiEl -> notification to look for
            * @return integer -> index of the notification or -1 if it doesn't exists
            */
            notificationIndex: function(notiEl) {
                var result = -1;
                var id = $.data(notiEl, 'id');                
                $.each(notiEls, function(index) {                    
                    if (id == $.data(this, 'id')) {
                        result = index;
                        return;
                    }
                });
                return result;
            },
            
            /**
             * This function is the one which handles the scrolling
             */
            scrollEventHandler: function() {                
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