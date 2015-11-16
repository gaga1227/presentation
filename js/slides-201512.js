//custom interactions in slides
var initSlideContent = function(index){
	//8
	var $gaga = $('.gaga');
	if (index == 8) {
		if ($gaga.length) {
			$gaga.addClass('animated');
			$gaga[0].offsetWidth;
		}
	} else {
		if ($gaga.length) {
			$gaga.removeClass('animated');
		}
	}
};
