/* Fullscreen Video Background */
(function($) {
	"use strict";

	/* Check if website opened on mobile devices and fallback video to image background on mobile devices */
	if(jQuery.browser.mobile){

		var bgImage = $(".player").data('mobile-fallback');

		/* Use fullscreen image */
		$('#header').append('<div style="background-image: url(' + bgImage + ');" class="fullscreen-bg"></div>');
	}else{

		/* Not mobile, use YTPlayer Fullscreen Video Background */
		$(".player").mb_YTPlayer();
	}
})(jQuery);
