
## index.html
* The code represents an HTML file for a personal portfolio website of mine.
* The `<head>` section includes meta tags for search engine optimization (SEO), links to external CSS files (Bootstrap, Font Awesome, Owl Carousel, etc.), and other resources required for the website.
* The `<body>` section contains the following main sections:
  - Header with a navigation menu
  - Home banner area with a brief introduction and personal information
  - "About Me" section with work experience and skills
  - Education section
  - Testimonials section
  - Skills section with icons representing different technologies and programming languages
  - Footer with contact information and social media links
* I used Bootstrap for responsive design and styling.
* JavaScript libraries like jQuery, Popper.js, and Owl Carousel are included for functionality and animations.
* The website showcases my profile, skills, and experience as a full-stack web developer, with a focus on technologies like JavaScript, React, Node.js, Express.js, MongoDB, and various cloud platforms.
* The website includes sections for displaying my work experience, education, and testimonials from projects.
* The Skills section features icons and descriptions for various programming languages, frameworks, databases, cloud platforms, packages, and other         technologies.
* The website includes links to my social media profiles (GitHub, Twitter, LinkedIn, Instagram) and encourages visitors to connect with me.
* The footer section contains a brief introduction, a note about the website being under construction, and a call-to-action for potential projects.

## about.html
* The HTML document starts with the standard `<!doctype html>` declaration and the `<html>` tag with the `lang="en"` attribute specifying the language as English.
* The `<head>` section contains meta information about the website, including the character encoding, viewport settings, favicon, title, description, and Open Graph meta tags for social media sharing.
*  The `<head>` section also includes links to external CSS files (Bootstrap, Font Awesome, Owl Carousel, Lightbox, Nice Select, Animate.css, Magnific Popup) and the website's custom CSS files (`style.css`, `fonts.css`, `responsive.css`).
* The `<body>` section starts with a header containing a navigation menu with links to "Home," "About," "Contact," and other sections.
* The main content area begins with a banner section displaying the text "About Kartik" and a breadcrumb navigation.
* The profile section includes a profile picture, personal information (name, date of birth, phone number, email, location), social media links, and a brief self-introduction.
* The welcome section provides more details about the person, including an "About Myself" section, project statistics, and skill levels displayed as progress bars.
*  The testimonials section showcases working experience, with information about past roles and projects.
* The blog section includes a blog post related to "Building Dynamic Pricing for Hotels" and categories for "Car Enthusiast," "Web Development," and "Database."
* The blog area displays two blog posts, one related to "Raybloc" and another about "Fireaway."
* The sidebar includes an author widget with a profile picture and social media links, a section for popular posts, an advertisement, a category list, and a tag cloud.
* The footer section contains information about the person, a subscription form, and social media links.
Overall, the code represents a personal portfolio website with sections for showcasing the person's profile, skills, work experience, blog posts, and other relevant information.

## contact.html
* The HTML document starts with the standard <!DOCTYPE html> declaration and the <html> tag with the lang="en" attribute specifying the language as English.
* The <head> section contains meta information about the website, including the character encoding, viewport settings, title, and links to external CSS files (Bootstrap, Font Awesome, and a custom style.css file).
* The <body> section starts with a header containing a navigation menu with links to "Home," "About," "Contact," and other sections.
* The main content area begins with a banner section displaying the text "Contact" and a breadcrumb navigation.
* The contact section includes a map container (<div id="mapBox">) with latitude, longitude, and zoom level data, as well as a contact form.
* The contact form consists of input fields for name, email, subject, and a textarea for the message. It also includes a submit button.
* The footer section contains information about the person, a section for sponsors/followers, and social media links.
* There are two modal dialogs: one for a success message when the contact form is submitted successfully, and another for an error message if there's an issue with the form submission.
* The code includes links to external JavaScript files, such as jQuery, Bootstrap, Stellar.js (for parallax effects), Lightbox, Nice Select, Isotope (for layout filtering), Magnific Popup, Owl Carousel, Counter-Up, and custom JavaScript files (mail-script.js, contact.js, theme.js).
* The code also includes a script to load the Google Maps API and initialize a map using the gmaps.min.js library.

## css/styles.css

The `css/styles.css` file contains a basic starting template for a responsive page.

## bootstrap.com: I used bootsrap libraries in my project 
-> https://getbootstrap.com/docs/5.3/layout/css-grid/ :
 Which  I used for layout of the pages, styling the button , responsive tiles on the webpages like in the skills.
 I used that on contact.html page for creating the contact form 
## flaticon
->https://www.flaticon.com/free-icons/twitter : I used flaticon for importing icons for social media platforms etc for  styling them maing the font modern, text decoration.
The  CSS code of style.css contains various rules for formatting HTML elements. Here are some key points about the code:

* It uses several Google Fonts, including "Heebo" and "Roboto", which are imported from the Google Fonts API.
* It defines several classes for formatting lists, links, and other HTML elements.
* It uses media queries to apply different styles depending on the screen size.
* It defines styles for the header area, including a navigation bar with dropdown menus.
* It defines styles for the top menu, which includes social media icons and a language pack.
* It defines styles for the home banner area, which includes a background image and a centered heading.
* It defines styles for the blog banner, which includes a background image and a centered text.
* It defines styles for the banner area, which includes a background image and a centered heading.
* It defines styles for the latest blog area, which includes a grid of blog posts with images and text.
* It defines styles for the welcome area, which includes a background image and a centered text.
* It defines styles for the tools expert area, which includes a list of skills with progress bars.
* It defines styles for the mytabs area, which includes a tabbed interface with different content panels.
* It defines styles for the single recent blog post, which includes an image and text.
* It defines styles for the blog categories area, which includes a grid of blog categories with images and text.
* It defines styles for the blog left sidebar, which includes various widgets such as a search bar, author information, and popular posts.
## images: 
1: 02 BUGGATI CSS Golden Era.jpg: https://www.topgear.com/sites/default/files/2023/08/Bugatti%20Chiron%20Super%20Sport%20Golden%20Era_material%20under%20embargo%20%282%29.jpg
2: Blog-SQL Database Schemas-IN-JY-67189: https://s38063.pcdn.co/wp-content/uploads/2021/09/Blog-SQLDatabaseSchemas-IM-JY-67189.jpg
3: businessman-touch-investment-growth.jpg: https://img.freepik.com/premium-photo/businessman-touch-investment-growth-graph-analysing-growth-achievement-diagram-data-trading_34200-837.jpg
4:logo.png: was created by me in word document
5: Profile.jpeg: is my photograph for landing page.  
6: (image1.png-image16.png): are different icons downloaded from flaticon.com.
## js/scripts.js

* There are lot of syling techniques that I  learnt during my placement year at Raybloc where i helped them styling the main website and interface for the workshop workers.

## contact.js
* The code is wrapped inside a jQuery $(document).ready() function, which ensures that the code runs after the HTML document has finished loading.
* Inside the $(document).ready() function, there's an immediately invoked function expression (IIFE) that takes jQuery $ as a parameter to create a local copy of jQuery and avoid conflicts with other libraries.
* The "use strict"; statement is used to enforce stricter rules in JavaScript.
* The code adds a custom validation method called answercheck to the jQuery Validator plugin. This method checks if the user has entered the word "cat" (case-insensitive) and returns an error message if the input is incorrect.
* The $('#contactForm').validate() function initializes the form validation for the form with the ID contactForm.
* Inside the validate() function, the rules object defines the validation rules for each input field, such as required, minlength, and email.
* The messages object provides custom error messages for each validation rule.
* The submitHandler function is called when the form is successfully validated. I used the ajaxSubmit() method from the jQuery Form plugin to submit the form data via AJAX.
* If the AJAX submission is successful, the form inputs are disabled, and a success modal dialog (#success) is shown.
* If the AJAX submission fails, an error modal dialog (#error) is shown.

## custom.js
* The code is wrapped inside an immediately invoked function expression (IIFE) that takes jQuery $ as a parameter to create a local copy of jQuery and avoid conflicts with other libraries.
* The "use strict"; statement is used to enforce stricter rules in JavaScript.
* The fixNavbar function is defined to handle the fixed navbar effect. It checks if the header area exists, and if so, it adds or removes the navbar_fixed class to the header area based on the scroll position.
* The initializeTestimonialSlider function initializes the testimonial slider using the Owl Carousel plugin. It sets various options like looping, margin between slides, number of slides to display, navigation buttons, autoplay, dots navigation, and responsive behavior.
* The initializeMailchimp function initializes the Mailchimp AJAX form by finding the form inside the #mc_embed_signup element and applying the ajaxChimp plugin.
* The initializeParallaxEffect function initializes the parallax effect on elements with the bg-parallax class using the parallax plugin.
* The $('select').niceSelect(); line initializes the niceSelect plugin for all select elements on the page.
* The $('#datetimepicker11,#datetimepicker1').datetimepicker({ daysOfWeekDisabled: [0, 6] }); line initializes the datetimepicker plugin for elements with * IDs datetimepicker11 and datetimepicker1, and disables Sunday and Saturday.
* The initializeGalleryMasonry function initializes the gallery masonry layout using the Isotope plugin. It checks if the #gallery element exists, waits * for images to load, and then applies the masonry layout with specified options.
* The initializeSimpleLightbox function initializes the Simple Lightbox plugin for elements with the class imageGallery1.light.
* The initializeGoogleMap function initializes the Google Map using the GMaps plugin. It retrieves various data attributes from the #mapBox element, such as latitude, longitude, zoom level, marker content, and info window content. It then creates a new map with the specified options and adds a marker with an info window.


PLEASE READ: My hand was broken for a while  which is why i applied for an extension and i wasnt able to make regural commits after end of february. i used to attend lectures and trying to keep me updated with the learning materials but i wasnt able to type.