$(document).ready(function(){
		// var slideIndex = 1;
	 //  showSlides(slideIndex);

		// function plusSlides(n) {
		//   showSlides(slideIndex += n);
		// }

		// function currentSlide(n) {
		//   showSlides(slideIndex = n);
		// }

		// function showSlides(n) {
		//   var i;
		//   var slides = document.getElementsByClassName("mySlides");
		//   var dots = document.getElementsByClassName("dot");
		//   if (n > slides.length) {slideIndex = 1}
		//   if (n < 1) {slideIndex = slides.length}
		//   for (i = 0; i < slides.length; i++) {
		//       slides[i].style.display = "none";
		//   }
		//   for (i = 0; i < dots.length; i++) {
		//       dots[i].className = dots[i].className.replace(" active", "");
		//   }
		//   slides[slideIndex-1].style.display = "block";
		//   dots[slideIndex-1].className += " active";
		// }

	function isElementInViewport(el) {
	  var rect = el.getBoundingClientRect();
	  return (
	    rect.top >= 0 &&
	    rect.left >= 0 &&
	    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
	    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	  );
	};

	var items = document.querySelectorAll(".timeline li");
	 
	// code for the isElementInViewport function
	 
	function callbackFunc() {
	  for (var i = 0; i < items.length; i++) {
	    if (isElementInViewport(items[i])) {
	      items[i].classList.add("in-view");
	    }
	  }
	}
	 
	window.addEventListener("load", callbackFunc);
	window.addEventListener("scroll", callbackFunc);

	// Returns true if the specified element has been scrolled into the viewport.
	function isElementInViewport(elem) {
	    var $elem = $(elem);

	    // Get the scroll position of the page.
	    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
	    var viewportTop = $(scrollElem).scrollTop();
	    var viewportBottom = viewportTop + $(window).height();

	    // Get the position of the element on the page.
	    var elemTop = Math.round( $elem.offset().top );
	    var elemBottom = elemTop + $elem.height();

	    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
	}

	// Check if it's time to start the animation.
	function checkAnimation() {
	    var $elem = $('.code-about');

	    // If the animation has already been started
	    if ($('.count').length > 0) {
	    	return;
	    };

	    if (isElementInViewport($elem)) {
	        // Start the animation
	        setTimeout(function start() {

	    $('.bar').each(function (i) {
	        var $bar = $(this);
	        $(this).append('<span class="count"></span>')
	        setTimeout(function () {
	            $bar.css('width', $bar.attr('data-percent'));
	        }, i * 100);
	    });

	    $('.count').each(function () {
	        $(this).prop('Counter', 0).animate({
	            Counter: $(this).parent('.bar').attr('data-percent')
	        }, {
	            duration: 2000,
	            easing: 'swing',
	            step: function (now) {
	                $(this).text(Math.ceil(now) + '%');
	            }
	        });
	    });

	})
	    }
	}

	// Capture scroll events
	$(window).scroll(function(){
	    checkAnimation();
	});


})