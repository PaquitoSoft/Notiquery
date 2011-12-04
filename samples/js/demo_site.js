$.noConflict();

jQuery(document).ready(function($) {
	
    // Highlight code
    $('#demo1').snippet('javascript', {style: 'emacs', showNum: false});
    $('#demo2').snippet('javascript', {style: 'emacs', showNum: false});
    
    // Execute first demo code
	$('#codeOneLink').click(function(event) {
		event.preventDefault();
		event.stopPropagation();
        demoCode.demoCodeOne();
	});

	// Execute second demo code
	$('#codeTwoLink').click(function(event) {
		event.preventDefault();
		event.stopPropagation();
        demoCode.demoCodeTwo();
	});
  
});

var demoCode = {
				
	demoCodeOne: function() {
		      
		// Showing a simple notification
		jQuery.notiquery('show', {
			title: 'Testing notification',
			message: 'This is a sample notitication showing how easy is to use Notiquery.'
		});
		      
		// Showing a notification that does not disappear.
		setTimeout(function() {
		   jQuery.notiquery('show', {
			title: 'Testing notification',
		    message: 'This notification will not disapper on its own. You must click on it to close.',
		    sticky: true
		   });
		}, 1000);
		      

		// Notification with large text with a custom class (change border color).
		setTimeout(function() {
		   jQuery.notiquery('show', {
			title: 'Testing notification',
			message: 'This is a notification with a long text. If the message you provide does not fit into the notification size, Notiquery magically auto resize its height so all the content is visible.',
			customClass: 'alert1'
		    });
		}, 2000);
		
		
	},
	
	demoCodeTwo: function() {

		//jQuery.notiquery('reset');

		// Change Notiquery configuration
		jQuery.notiquery({
			locationVType: 'bottom',
			locationHType: 'left'
		});			
		
		// Showing a notification with no title
		jQuery.notiquery('show', {
		   message: 'This is a simple notification message that has no title. This can be useful in some situation when you do not need to label your notification'
		});
		
		// Showing a notification with custom width and for a shorter period of time
		setTimeout(function() {
			jQuery.notiquery('show', {
		   		title: 'Custom notification',
		   		message: 'I override some plugin default properties for this notification so I can show how you can configure a single one',
		   		width: 200, 
		   		visibleTime: 2500
			});	
		}, 1000);
		
	}
	
};
