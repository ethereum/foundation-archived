(function($) {
	"use strict";
	
	var $window = $(window),
		navHeight = $('.nav').height(); // nav height
	
	/* Mobile Nav */
	$('#nav-toggle').click(function(){
		$(this).toggleClass('active');
		$('.nav').toggleClass('open');

		return false;
	});

	/* Check navigation container height and add scrollbar if necessary */
	$window.on('resize', function(){
		navHeight = $('.nav').height();
		updateNavContainer(navHeight); // run the function if window resized
	});
	updateNavContainer(navHeight); // run the function

	/* Expand/shrink navigation */
	$("#header").waypoint({
		handler: function(direction) {
			$(".nav-header").toggleClass('blackout', direction === 'down');
		},
		offset: function() {
			return -($(".nav-header").outerHeight()-50);
		}
	});

	/* Owl Carousel Quotes Section */
	$(".carousel").owlCarousel({
		navigation: false,
		autoPlay: true,
		slideSpeed : 1500,
		paginationSpeed : 1500,
		singleItem:true
	});
	
	/* Owl Carousel Quotes Section */
	$(".video").fitVids();

	/* function to update navigation container */
	function updateNavContainer(navHeight) {

		var winHeight = $window.height(), // window height
			winWidth = $window.width(), // window width
			scrollHeight = Math.floor(winHeight-90);

		if ( winWidth <= '767' && scrollHeight <= navHeight ) {
			$('.nav').css({ 'overflow-y' : 'scroll', 'height' : scrollHeight  });
		}else{
			$('.nav').removeAttr('style');
		}
	}
})(jQuery);


