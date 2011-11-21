$.noConflict();
window.addEvent('domready', function(event) {
    
    // Element style syntax with files inside of a folder called "js".
    $('demo1').light({
    	altLines: 'hover'
   	});
   
    $('demo2').light({altLines: 'hover'});

});

jQuery(document).ready(function($) {
	
	$('#codeOneLink').click('click', function(event) {
		//event.stop();
		//demoCode.demoCodeOne();
		console.log("Elemento pulsado 1: ");
		console.log(this);
		event.preventDefault();
		event.stopPropagation();
	});

	$('#codeTwoLink').click(function(event) {
		//event.stop();
		//demoCode.demoCodeTwo();
		console.log("Elemento pulsado 2: ");
		console.log(this);
		event.stopPropagation();
	});
  
});

var demoCode = {
				
	demoCodeOne: function() {
		      
		// Showing a simple notification
		jQuery.notiquery('show', {
			title: 'Testing notification',
			message: 'This is a sample notitication showing how easy is to use Notimoo.',
			customClass: 'alert1'
		});
		      
		// Showing a notification that does not disappear.
		/*(function() {
		   jQuery.notiquery('show', {
			title: 'Testing notification',
		    message: 'This notification will not disapper on its own. You must click on it to close.',
		    customClass: 'alert2',
		    sticky: true
		   });
		}).delay(2000, this);
		      

		// Notification with large text.
		(function() {
		   jQuery.notiquery('show', {
			title: 'Testing notification',
			message: 'This is a notification with a long text. If the message you provide does not fit into the notification size, Notimoo magically auto resize its height so all the content is visible.',
			customClass: 'alert1'
		    });
		}).delay(4000, this);
		*/
		
	},
	
	demoCodeTwo: function() {

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
		(function() {
			jQuery.notiquery('show', {
		   		title: 'Custom notification',
		   		message: 'I override some manager properties for this notification so I can show how you can configure a single one',
		   		width: 200, 
		   		visibleTime: 2500
			});	
		} ).delay(1500, this);
		
	}
	
};
