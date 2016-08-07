$(document).ready(function(){
	$(".topbar").on("mouseenter", function(){
		$(this).css("letter-spacing", "2px")
    $(this)[0].innerHTML = "My Beautiful Dark Twisted Photos"
	})

	$(".topbar").on("mouseleave", function(){
		$(this).css("letter-spacing", "10px")
    $(this)[0].innerHTML = "MBDTP"
	})

	$(".topbar").on("click", function(){
		$(".overlay").css("opacity","1.0")
	})

	$(".overlay").on("click", function(){
		$(".overlay").css("opacity","1.0")
		goToByScroll($(this)[0].id)
		$(this).css("opacity","0.0");

		function goToByScroll(id){
		    id = id.replace("link", "");
		    $('html,body').animate({
		        scrollTop: $("#"+id).offset().top},
		        'slow');
		}

	})
})