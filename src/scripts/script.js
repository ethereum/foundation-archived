(function($) {
	"use strict";

	var $window = $(window),
		separator = $('body').data('separator'), // get separator type
		mobile_animate = $('body').data('mobile-animate'), // enable mobile animation
		navHeight = $('.nav').height(); // nav height

	/* On Load */
	$window.load(function() { // makes sure the whole site is loaded
		$('#status').fadeOut(); // will first fade out the loading animation
		$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
		$('body').delay(450).removeClass('preload'); // Animate CSS after page load
	});

	/* Load SVG */
	if(Modernizr.inlinesvg && separator !== undefined) { //if inlinesvg supported and separator type defined

		/* add necessary class */
		$('section:not(:last)').addClass('has-svg'); // add 'has-svg' class to all section with svg separator, exclude last section (without svg)
		$('section:first').addClass('pull'); // add 'pull' class to adjust layout for first section
		$('section:last').addClass('push'); // add 'push' class to adjust layout for last section (without svg)

		/* if separator type == 'skew' */
		if(separator === 'skew'){
			$('section:not(:last)').append(getSeparator('images/separator-bottom.svg'));
			$('section:first').prepend(getSeparator('images/separator-top.svg'));
		}

		/* if separator type == 'slopy' */
		if(separator === 'slopy'){
			$('section:not(:last)').not(':even').append(getSeparator('images/separator-bottom.svg'));
			$('section:not(:last)').not(':odd').append(getSeparator('images/separator-bottom-alt.svg'));
			$('section:first').prepend(getSeparator('images/separator-top.svg'));
		}

		/* if separator type == 'triangle' */
		if(separator === 'triangle'){
			$('section').not(':last').append(getSeparator('images/separator-bottom-triangle.svg'));
			$('section:first').prepend(getSeparator('images/separator-top-triangle.svg'));
		}
	}

	/* replace svg icon menu with png if svg not supported*/
	if(!Modernizr.svg) {
		$("#nav-toggle").find("img[src='images/icon-menu.svg']").attr('src', 'images/icon-menu.png');
	}

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

	/* Main Navigation Click */
	$('.nav a').click( function() {

		/* Reset mobile menu nav state */
		$(this).parent().removeClass('open');
		$('#nav-toggle').removeClass('active');

		scrollToTarget($(this).attr("href"));

		return false;
	});

	/* Same Page Navigation Click */
	$('a[href*=#]:not([href=#])').click( function() {

		scrollToTarget($(this).attr("href"));

		return false;
	});

	/* if URL has hash */
	$(function(){
		if(window.location.hash) scrollToTarget(window.location.hash);
	});

	/* Scroll to Top */
	$('.scrolltop').click(function(){

        $("html, body").animate({ scrollTop: 0 }, 800);

        return false;
    });

	/* Add modernizr test to check preserve-3d browser support for text-rotator https://gist.github.com/Matori/4123325 */
	Modernizr.addTest('csstransformspreserve3d', function () {

		var prop,
		val,
		cssText,
		ret;

		prop = 'transform-style';
		if ('webkitTransformStyle' in document.documentElement.style) {
			prop = '-webkit-' + prop;
		}
		val = 'preserve-3d';
		cssText = '#modernizr { ' + prop + ': ' + val + '; }';

		Modernizr.testStyles(cssText, function (el, rule) {
			ret = window.getComputedStyle ? getComputedStyle(el, null).getPropertyValue(prop) : '';
		});

		return (ret === val);
	});

	/* Define animation type based on preserve-3d test */
	var checkAnim = (Modernizr.csstransforms3d && Modernizr.csstransformspreserve3d) ? 'flipUp' : 'fade';

	/* Start textrotator */
	$(".rotate").textrotator({
		animation: checkAnim,
		speed: 2000
	});

	/* Set font size with fitText */
	$(".fittext").fitText(1.2, { minFontSize: '20px', maxFontSize: '80px' });

	/* Expand/shrink navigation */
	$("#header").waypoint({
		handler: function(direction) {
			$(".nav-header").toggleClass('blackout', direction === 'down');
		},
		offset: function() {
			return -($(".nav-header").outerHeight()-50);
		}
	});

	/* Active navigation indicator */
	$("section").waypoint({
		handler: function(direction) {

			var active_section = $(this);

			if (direction === "up") {
				active_section = active_section.prev();
			}

			$(".nav a").removeClass("current");  // remove 'current' class to navigation link
			$('.nav a[href="#' + active_section.attr("id") + '"]').addClass("current");  // add 'current' class to active navigation link
		},
		offset: '25%'
	});

	/* Chart animation */
	$('#skill').waypoint(function(direction){

		$('.percentage').easyPieChart({
			animate: 4000,
			trackColor: "#f5f5f5",
			barColor: "#a9a9a9",
			scaleColor: false,
			lineCap: 'butt',
			lineWidth: 15,
			size: 200,
			onStep: function(from,to,percent) {
				$(this.el).find('span').text(Math.round(percent));
			}
		});

	},{offset: '100%',triggerOnce: true});

	/* Opening Section Animation */
	if(mobile_animate === true && mobile_animate !== undefined) { // animate on scroll on all devices!
		animateOnScroll();
	}else{ // only animate if not on mobile devices
		if (!jQuery.browser.mobile) animateOnScroll();
	}

	/* Mixitup */
	var filterList = {
		init: function () {
			$('#portfolio-grid').mixitup({
				targetSelector: '.portfolio-block',
				filterSelector: '.filter',
				effects: ['fade'],
				easing: 'snap'
			});
		}
	};
	filterList.init();// Run Mixitup!

	/* Magnific Popup Image*/
	$('.portfolio-image').magnificPopup({
		type: 'image',
		mainClass: 'mfp-with-zoom',
		zoom: {
			enabled: true,
			duration: 300, // duration of the effect, in milliseconds
			easing: 'ease-in-out' // CSS transition easing function
		}
	});

	/* Magnific Popup Video*/
	$('.portfolio-video').magnificPopup({
		type: 'iframe'
	});

	/* Magnific Popup Ajax for Portfolio and Post */
	$('.portfolio-ajax, .post-ajax').magnificPopup({
		type: 'ajax',
		removalDelay: 300,
		disableOn: 480,

		callbacks: {
			parseAjax: function( mfpResponse ) {

				var fragment = ( '#post' ); // only fragment with parent element with id="post"

				mfpResponse.data = $( mfpResponse.data ).filter( fragment );
			},
			ajaxContentAdded: function() {
			$('.root-class').find("*").addClass("mfp-prevent-close");
				// Ajax content is loaded and appended to DOM
				if( $.existsin('.video', this.content) ) this.content.fitVids();
				if( $.existsin('.carousel', this.content) ) {
					this.content.find('.carousel').owlCarousel({
						navigation: false,
						autoPlay: false, // set true to enable autoplay
						slideSpeed : 500,
						paginationSpeed : 500,
						singleItem:true
					});
				}
			}
		}
	});

	/* function to check if element exist after once the ajax is loaded and appended to the DOM */
	$.existsin = function (what, where) {
		return jQuery(where).find(what).length > 0;
	}

	/* Owl Carousel Client Section */
	$(".client-carousel").owlCarousel({
		navigation: false,
		autoPlay: true,
		slideSpeed : 500,
		paginationSpeed : 500
	});

	/* Owl Carousel Quotes Section */
	$(".quotes-carousel").owlCarousel({
		navigation: false,
		autoPlay: true,
		slideSpeed : 500,
		paginationSpeed : 500,
		singleItem:true
	});

	/* Ajax Contact form submit */
	$("#contact-form").submit(function() {

		var url = "sendmail.php"; // the script where you handle the form input.

		$(".form-notification").remove(); // remove all previous notifications

		$.ajax({
			type: "POST",
			url: url,
			data: $("#contact-form").serialize(), // serializes the form's elements.
			success: function(data)
			{
				$("#contact-form").append(data); // show response from the php script.
			}
		});

		return false; // avoid to execute the actual submit of the form.
	});

	/* function to get SVG separator */
	function getSeparator( sourceUrl )
	{
		var result = null;

		$.ajax({
			url: sourceUrl,
			type: 'get',
			dataType: 'xml',
			async: false,
			success: function(data) {

				var $svg = $(data).find('svg'); // Get the SVG tag, ignore the rest

				$svg = $svg.removeAttr('xmlns:a'); // Remove any invalid XML tags as per http://validator.w3.org
				result = $svg;
			}
		});

		return result;
	}

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

	/* function to scroll to target*/
	function scrollToTarget(targetScroll){

		var targetOffset = ( $(targetScroll).not(".pull").hasClass("has-svg") || $(targetScroll).hasClass("push") ) ? 50 : -50; // define offset

		/* scroll to posistion */
		$.scrollTo(
			targetScroll,
			{
				duration: 800,
				offset: targetOffset,
				axis:'y'
			}
		);
	}

	/* function to animate on scroll */
	function animateOnScroll(){
		$('.anim').addClass('transparent'); // hide (make transparent) all elements before animation

		$('.anim').waypoint(function(direction){

			var anim = $(this).data('anim');

			$(this).removeClass('transparent').addClass(anim + ' animated opaque'); // animate and show all elements

		},{offset: '95%',triggerOnce: true});
	}

	/* Google Maps */
	function initialize(){

		var map_canvas = document.getElementById('map');
		var myLatlng = new google.maps.LatLng(47.183805,8.530910);
		var map_options = {
			center: myLatlng,
			zoom: 18,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scrollwheel: false,
			panControl: false,
			zoomControl: true,
			zoomControlOptions: { style : google.maps.ZoomControlStyle.SMALL }
		};

		var map = new google.maps.Map(map_canvas, map_options);
		map.set('styles', [
		{
			stylers: [
				{ hue: "#d8d8d8" },
				{ saturation: -100 }
			]
		}
		]);

		var infowindow = new google.maps.InfoWindow({
			content: '<h3>Ethereum GmbH</h3>'
		});

		// retina ready custom marker maps icon
		var myIcon = new google.maps.MarkerImage("images/map-icon@2x.png", null, null, null, new google.maps.Size(31,51));
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: myIcon
		});
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});
	}
	google.maps.event.addDomListener(window, 'load', initialize);
})(jQuery);


