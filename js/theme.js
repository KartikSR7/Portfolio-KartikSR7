(function($){
    "use strict"

    const nav_offset_top = $('header').height() + 50;

    /*Navbar*/

	//* Navbar Fixed  
	function navbarFixed(){
	    if ( $('.header_area').length ){ 
	        $(window).scroll(function() {
	            let scroll = $(window).scrollTop();   
	            if (scroll >= nav_offset_top ) {
	                $(".header_area").addClass("navbar_fixed");
	            } else {
	                $(".header_area").removeClass("navbar_fixed");
	            }
	        });
	    };
	};
	navbarFixed();
	


	/*  Isotope Fillter js*/
	function gallery_isotope(){
	    if ( $('.gallery_f_inner').length ){
	        // Activate isotope in container
			$(".gallery_f_inner").imagesLoaded( function() {
	                $(".gallery_f_inner").isotope({
	                    layoutMode: 'fitRows',
	                    animationOptions: {
	                        duration: 750,
	                        easing: 'linear'
	                    }
	                }); 
	            });
			
	            // Add isotope click function
	            $(".gallery_filter li").on('click',function(){
	                $(".gallery_filter li").removeClass("active");
	                $(this).addClass("active");

	                let selector = $(this).attr("data-filter");
	                $(".gallery_f_inner").isotope({
	                    filter: selector,
	                    animationOptions: {
	                        duration: 450,
	                        easing: "linear",
	                        queue: false,
	                    }
	                });
	                return false;
	            });
	        }
	    }
	gallery_isotope();
	

	
	/*  Workings section*/
	function testimonials_slider(){
	    if ( $('.testi_slider').length ){
	        $('.testi_slider').owlCarousel({
	            loop:true,
	            margin: 30,
	            items: 3,
	            nav: false,
	            autoplay: true,
	            smartSpeed: 1000,
	            dots:true, 
	            responsiveClass: true,
	            responsive: {
	                0: {
	                    items: 1,
	                },
	                768: {
	                    items: 3,
	                },
	            }
	        })
	    }
	}
	testimonials_slider();
	

	/*  Google map js*/
     
	if ( $('#mapBox').length ){
	    let $lat = $('#mapBox').data('lat');
	    let $lon = $('#mapBox').data('lon');
	    let $zoom = $('#mapBox').data('zoom');
	    let $marker = $('#mapBox').data('marker');
	    let $info = $('#mapBox').data('info');
	    let $markerLat = $('#mapBox').data('mlat');
	    let $markerLon = $('#mapBox').data('mlon');
	    let map = new GMaps({
	    el: '#mapBox',
	    lat: $lat,
	    lng: $lon,
	    scrollwheel: false,
	    scaleControl: true,
	    streetViewControl: false,
	    panControl: true,
	    disableDoubleClickZoom: true,
	    mapTypeControl: false,
	    zoom: $zoom,
	        styles: [
	            {
	                "featureType": "water",
	                "elementType": "geometry.fill",
	                "stylers": [
	                    {
	                        "color": "#dcdfe6"
	                    }
	                ]
	            },
	            {
	                "featureType": "transit",
	                "stylers": [
	                    {
	                        "color": "#808080"
	                    },
	                    {
	                        "visibility": "off"
	                    }
]
	            },
	            {
	                "featureType": "road.highway",
	                "elementType": "geometry.stroke",
	                "stylers": [
	                    {
	                        "visibility": "on"
	                    },
	                    {
	                        "color": "#dcdfe6"
	                    }
	                ]
	            },
	            {
	                "featureType": "road.highway",
	                "elementType": "geometry.fill",
	                "stylers": [
	                    {
	                        "color": "#ffffff"
	                    }
	                ]
	            },
	            {
	                "featureType": "road.local",
	                "elementType": "geometry.fill",
	                "stylers": [
	                    {
	                        "visibility": "on"
	                    },
	                    {
	                        "color": "#ffffff"
	                    },
	                    {
	                        "weight": 1.8
	                    }
	                ]
	            },
	            {
	                "featureType": "road.local",
	                "elementType": "geometry.stroke",
	                "stylers": [
	                    {
	                        "color": "#d7d7d7"
	                    }
	                ]
	            },
	            {
	                "featureType": "poi",
	                "elementType": "geometry.fill",
	                "stylers": [
	                    {
	                        "visibility": "on"
	                    },
	                    {
	                        "color": "#ebebeb"
	                    }
	                ]
	            },
	            {
	                "featureType": "administrative",
	                "elementType": "geometry",
	                "stylers": [
	                    {
	                        "color": "#a7a7a7"
	                    }
	                ]
	            },
	            {
	                "featureType": "road.arterial",
	                "elementType": "geometry.fill",
	                "stylers": [
	                    {
	                        "color": "#ffffff"
	                    }
	                ]
	            },
	            {
	                "featureType": "road.arterial",
	                "elementType": "geometry.fill",
	                "stylers": [
	                    {
	                        "color": "#ffffff"
	                    }
	                ]
	            },
	            {
	                "featureType": "landscape",
	                "elementType": "geometry.fill",
	                "stylers": [
	                    {
	                        "visibility": "on"
	                    },
	                    {
	                        "color": "#efefef"
	                    }
	                ]
	            },
	            {
	                "featureType": "road",
	                "elementType": "labels.text.fill",
	                "stylers": [
	                    {
	                        "color": "#696969"
	                    }
	                ]
	            },
	            {
	                "featureType": "administrative",
	                "elementType": "labels.text.fill",
	                "stylers": [
	                    {
	                        "visibility": "on"
	                    },
	                    {
	                        "color": "#737373"
	                    }
	                ]
	            },
	            {
	                "featureType": "poi",
	                "elementType": "labels.icon",
	                "stylers": [
	                    {
	                        "visibility": "off"
	                    }
	                ]
	            },
	            {
	                "featureType": "poi",
	                "elementType": "labels",
	              "stylers": [
	                    {
	                        "visibility": "off"
	                    }
	                ]
	            },
	            {
	                "featureType": "road.arterial",
	                "elementType": "geometry.stroke",
	                "stylers": [
	                    {
	                        "color": "#d6d6d6"
	                    }
	                ]
	            },
	            {
	                "featureType": "road",
	                "elementType": "labels.icon",
	                "stylers": [
	                    {
	                        "visibility": "off"
	                    }
	                ]
	            },
	            {},
	            {
	                "featureType": "poi",
	                "elementType": "geometry.fill",
	                "stylers": [
	                    {
	                        "color": "#dadada"
	                    }
	                ]
	            }
	        ]
	    });
	}
})(jQuery)