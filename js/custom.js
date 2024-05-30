// Define the function and pass in jQuery as a parameter
(function($) {
    "use strict";

    // Get the height of the header area and add 50 pixels for the navbar fixed effect
    const headerHeight = $('.header_area').height() + 50;

    /* Navbar */

    // fixNavbar function checks if the header_area exists and adds or removes the "navbar_fixed" class based on the scroll position
    function fixNavbar() {
        if ($('.header_area').length) {
            $(window).scroll(function() {
                const scrollTop = $(window).scrollTop();
                if (scrollTop >= headerHeight) {
                    $(".header_area").addClass("navbar_fixed");
                } else {
                    $(".header_area").removeClass("navbar_fixed");
                }
            });
        }
    }
    // Call the fixNavbar function
    fixNavbar();

    // initializeTestimonialSlider function initializes the testimonial slider using the Owl Carousel plugin
    function initializeTestimonialSlider() {
        if ($('.testimonial_slider').length) {
            $('.testimonial_slider').owlCarousel({
                loop: true, // Loop the slider
                margin: 30, // Margin between slides
                items: 2, // Number of slides to display
                nav: false, // Disable navigation buttons
                autoplay: true, // Enable autoplay
                dots: true, // Enable dots navigation
                smartSpeed: 1500, // Autoplay speed
                responsiveClass: true, // Enable responsive classes
                responsive: {
                    0: { // For mobile devices
                        items: 1,
                    },
                    768: { // For tablets
                        items: 2,
                    },
                }
            });
        }
    }
    // Call the initializeTestimonialSlider function
    initializeTestimonialSlider();

    // initializeMailchimp function initializes the Mailchimp AJAX form
    function initializeMailchimp() {
        $('#mc_embed_signup').find('form').ajaxChimp();
    }
    // Call the initializeMailchimp function
    initializeMailchimp();

    /* Parallax Effect */

    // initializeParallaxEffect function initializes the parallax effect on the bg-parallax elements
    function initializeParallaxEffect() {
        $('.bg-parallax').parallax();
    }
    // Call the initializeParallaxEffect function
    initializeParallaxEffect();

    // Initialize the niceSelect plugin for all select elements
    $('select').niceSelect();

    // Initialize the datetimepicker plugin for the datetimepicker11 and datetimepicker1 elements
    $('#datetimepicker11,#datetimepicker1').datetimepicker({
        daysOfWeekDisabled: [0, 6] // Disable Sunday and Saturday
    });

    /* Gallery Isotope js */

    // initializeGalleryMasonry function initializes the gallery masonry layout using the Isotope plugin
    function initializeGalleryMasonry() {
        if ($('#gallery').length) {
            $('#gallery').imagesLoaded(function() {
              $("#gallery").isotope({
                    itemSelector: ".gallery_item", // Select the gallery_item class as the item selector
                    layoutMode: 'masonry', // Use the masonry layout mode
                    animationOptions: {
                        duration: 750, // Set the duration of the animation
                        easing: 'linear' // Set the easing of the animation
                    }
                });
            });
        }
    }
    // Call the initializeGalleryMasonry function
    initializeGalleryMasonry();

    /* Simple LightBox js */

    // initializeSimpleLightbox function initializes the Simple Lightbox plugin for the imageGallery1 elements
    function initializeSimpleLightbox() {
        $('.imageGallery1.light').simpleLightbox();
    }
    // Call the initializeSimpleLightbox function
    initializeSimpleLightbox();

    /* Google Map js */

    // initializeGoogleMap function initializes the Google Map using the GMaps plugin
    function initializeGoogleMap() {
        if($('#mapBox').length) {
            const latitude = $('#mapBox').data('lat');
            const longitude = $('#mapBox').data('lon');
            const zoomLevel = $('#mapBox').data('zoom');
            const markerContent = $('#mapBox').data('marker');
            const infoWindowContent = $('#mapBox').data('info');
            const markerLatitude = $('#mapBox').data('mlat');
            const markerLongitude = $('#mapBox').data('mlon');

            let map = new GMaps({
                el: '#mapBox',
                lat: latitude,
                lng: longitude,
                scrollwheel: false,
                scaleControl: true,
                streetViewControl: false,
                panControl: true,
                disableDoubleClickZoom: true,
                mapTypeControl: false,
                zoom: zoomLevel,
                styles: [
                    // array of style objects for map customization
                ]
            });

            map.addMarker({
                lat: markerLatitude,
                lng: markerLongitude,
                title: 'Marker',
                infoWindow: {
                    content: infoWindowContent
                }
            });
        }
    }
    // Call the initializeGoogleMap function
    initializeGoogleMap();

})(jQuery);