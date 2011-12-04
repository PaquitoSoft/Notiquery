Notiquery
=======

This plugin provides the web developer with a way to show notification to the users.

This is a jQuery port of my previous [Mootools](http://www.mootools.net) plugin called [Notimoo](http://github.com/PaquitoSoft/Notimoo).



How to use
----------

Using Notiquery is very easy. It comes with predefined settings that will allow anybody 
to use it just with a couple of lines:
	
    // Showing a simple notification
    $.notiquery('show',{
        title: 'Testing notification',
        message: 'This is a sample notitication showing how easy is to use Notimoo.'
    });
	
    // Showing a notification that does not disappear using a custom class.
    $.notiquery('show', {
        title: 'Testing notification',
        message: 'This notification will not disapper on its own. You must click on it to close.',
        sticky: true,
       customClass: 'info'
    });

There are a lot of settings you can customize and some of them can be 
overriden every time you call the show() method.

    // Update the plugin so notifications are shown in the upper-left corner: 
    $.notiquery({
        locationVtype: 'top',
        locationHType: 'left'
    });
	
    // Show a notification with a custom width and displaying time:
    $.notiquery('show', {
        title: 'Custom notification',
        message: 'Testing custom width and visible time for this notification',
        width: 200,
        visibleTime: 2500
    });
	
