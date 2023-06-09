/*jshint jquery:true */

$(document).ready(function($) {
	"use strict";

	/* global google: false */
	/*jshint -W018 */


/*-------------------------------------------------*/
/* =  portfolio isotope
/*-------------------------------------------------*/

var winDow = $(window);
	// Needed variables
	var $container=$('.iso-call');
	var $filter=$('.filter');

	try{
		$container.imagesLoaded( function(){
			$container.trigger('resize');
			$container.isotope({
				filter:'*',
				layoutMode:'masonry',
				animationOptions:{
					duration:750,
					easing:'linear'
				}
			});
		});
		setTimeout(Resize, 1500);
	} catch(err) {
	}

	winDow.on('resize', function(){
		var selector = $filter.find('a.active').attr('data-filter');

		try {
			$container.isotope({ 
				filter	: selector,
				animationOptions: {
					duration: 750,
					easing	: 'linear',
					queue	: false,
				}
			});
		} catch(err) {
		}
		return false;
	});
	
	// Isotope Filter 
	$filter.find('a').on('click', function(){
		var selector = $(this).attr('data-filter');

		try {
			$container.isotope({ 
				filter	: selector,
				animationOptions: {
					duration: 750,
					easing	: 'linear',
					queue	: false,
				}
			});
		} catch(err) {

		}
		return false;
	});


	var filterItemA	= $('.filter li a');

	filterItemA.on('click', function(){
		var $this = $(this);
		if ( !$this.hasClass('active')) {
			filterItemA.removeClass('active');
			$this.addClass('active');
		}
	});

	/*-------------------------------------------------*/
	/* =  Top section
	/*-------------------------------------------------*/

	var windowHeight = winDow.height(),
		topSection = $('#home-section');
	topSection.css('height', windowHeight);

	winDow.on('resize', function(){
		var windowHeight = winDow.height();
		topSection.css('height', windowHeight);
	});

	/*-------------------------------------------------*/
	/* =  preloader function
	/*-------------------------------------------------*/
	winDow.load( function(){
		var mainDiv = $('#container'),
			preloader = $('.preloader');

			preloader.fadeOut(400, function(){
				mainDiv.delay(400).addClass('active');
			});
	});
	/*-------------------------------------------------*/
	/* =  count increment
	/*-------------------------------------------------*/
	try {
		$('.statistic-post').appear(function() {
			$('.timer').countTo({
				speed: 4000,
				refreshInterval: 60,
				formatter: function (value, options) {
					return value.toFixed(options.decimals);
				}
			});
		});
	} catch(err) {

	}
	
	/*-------------------------------------------------*/
	/* =  OWL carousell
	/*-------------------------------------------------*/
	try {
		var owlWrap = $('.owl-wrapper');

		if (owlWrap.length > 0) {

			if (jQuery().owlCarousel) {
				owlWrap.each(function(){

					var carousel= $(this).find('.owl-carousel'),
						dataNum = $(this).find('.owl-carousel').attr('data-num'),
						dataNum2,
						dataNum3;

					if ( dataNum == 1 ) {
						dataNum2 = 1;
						dataNum3 = 1;
					} else if ( dataNum == 2 ) {
						dataNum2 = 2;
						dataNum3 = dataNum - 1;
					} else {
						dataNum2 = dataNum - 1;
						dataNum3 = dataNum - 2;
					}

					carousel.owlCarousel({
						autoPlay: 10000,
						navigation : true,
						items : dataNum,
						itemsDesktop : [1199,dataNum2],
						itemsDesktopSmall : [991,dataNum2],
						itemsTablet : [768, dataNum3],
					});

				});
			}
		}

	} catch(err) {

	}
	
	/* ---------------------------------------------------------------------- */
	/*	Contact Map
	/* ---------------------------------------------------------------------- */

	try {
		var fenway = [42.345573,-71.098326]; //Change a map coordinate here!
		var markerPosition = [42.345573,-71.098326]; //Change a map marker here!
    	$('#map')
			.gmap3({
				center: fenway,
				zoom: 13,
				mapTypeId : google.maps.MapTypeId.ROADMAP
			})
			.marker({
				position: markerPosition,
				icon: 'images/marker.png'
		});
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */

	var submitContact = $('#submit_contact'),
		message = $('#msg');

	submitContact.on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		
		$.ajax({
			type: "POST",
			url: 'contact.php',
			dataType: 'json',
			cache: false,
			data: $('#contact-form').serialize(),
			success: function(data) {

				if(data.info !== 'error'){
					$this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
					message.hide().removeClass('alert-success').removeClass('alert-danger').addClass('alert-success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					message.hide().removeClass('alert-success').removeClass('alert-danger').addClass('alert-danger').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			}
		});
	});
	
	/*-------------------------------------------------*/
	/* =  Scroll to TOP
	/*-------------------------------------------------*/

	var animateTopButton = $('a.go-top'),
		htmBody = $('html, body');
		
	animateTopButton.on('click', function(event){
		event.preventDefault();
		htmBody.animate({scrollTop: 0}, 'slow');
		return false;
	});

	/*-------------------------------------------------*/
	/* =  flexslider
	/*-------------------------------------------------*/
	try {

		var SliderPost = $('.flexslider');

		SliderPost.flexslider({
			animation: "fade"
		});
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	Load more posts from container
	/* ---------------------------------------------------------------------- */

	var LoadButton = $('a.load-post-container'),
		PortContainer = ('.iso-call'),
		i = 0,
		s = 0;

	LoadButton.live( 'click', function(event) {
		event.preventDefault();

		var LoadContainer = $(this).attr('data-load'),
			xel = parseInt($(this).attr('data-number'));

		var storage = document.createElement('div');
		$(storage).load(LoadContainer + " .project-item", function(){

			var elemloadedLength = $(storage).find('.project-item').length;
			
			if ( !((s + 1) > elemloadedLength) ) {

				s = i + xel;

				var t = i - 1;
				var $elems;

				if ( i === 0 ) {
					/// create new item elements
					$elems = $(storage).find(".project-item:lt(" + s + ")").appendTo(PortContainer);
					// append elements to container
					$container.isotope( 'appended', $elems );

				} else {
					/// create new item elements
					$elems = $(storage).find(".project-item:lt(" + s + "):gt("+ t +")").appendTo(PortContainer);
					// append elements to container
					$container.isotope( 'appended', $elems );

				}

				i = i + xel;
			}

			if ( !( s < elemloadedLength ) ) {
				$('a.load-post-container').text("No more posts");
			}

		});
	
	});

	/* ---------------------------------------------------------------------- */
	/*	magnific-popup
	/* ---------------------------------------------------------------------- */

	try {
		// Example with multiple objects
		$('.zoom').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			}
		});

	} catch(err) {

	}
	
	/*-------------------------------------------------*/
	/* =   Smooth scroll
	/*-------------------------------------------------*/

	//Get Sections top position
	function getTargetTop(elem){
		
		//gets the id of the section header
		//from the navigation's href e.g. ("#html")
		var id = elem.attr("href");

		//Height of the navigation
		var offset = 78;

		//Gets the distance from the top and 
		//subtracts the height of the nav.
		return $(id).offset().top - offset;
	}

	//Smooth scroll when user click link that starts with #

	var elemHref = $('.navbar-nav a.nav-link[href^="#"], a.scroll-btn[href^="#"]');

	elemHref.on('click', function(event) {
		
		//gets the distance from the top of the 
		//section refenced in the href.
		var target = getTargetTop($(this));

		//scrolls to that section.
		$('html, body').animate({scrollTop:target}, 600);

		//prevent the browser from jumping down to section.
		event.preventDefault();
	});

	/* ---------------------------------------------------------------------- */
	/*	Header animate after scroll
	/* ---------------------------------------------------------------------- */

	(function() {

		var docElem = document.documentElement,
			didScroll = false,
			changeHeaderOn = 130;
			document.querySelector( 'header' );
		function init() {
			window.addEventListener( 'scroll', function() {
				if( !didScroll ) {
					didScroll = true;
					setTimeout( scrollPage, 100 );
				}
			}, false );
		}
		
		function scrollPage() {
			var sy = scrollY();
			if ( sy >= changeHeaderOn ) {
				$( 'header' ).addClass('active');
			}
			else {
				$( 'header' ).removeClass('active');
			}
			didScroll = false;
		}
		
		function scrollY() {
			return window.pageYOffset || docElem.scrollTop;
		}
		
		init();
		
	})();

});

function Resize() {
	$(window).trigger('resize');
}