//custom interactions in slides
var initSlideContent = function(index){
	// 15
	var $gaga = $('.gaga');
	if (index == 15) {
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

// img logo
(function() {
	var logoDblClickHandler = function(e) {
		if (e) {
			e.preventDefault();
		}

		var $puntersDemoFrame = $('iframe#puntersDemoFrame');
		if ($puntersDemoFrame.length && keypoint.getCurrentSlideIndex() === 13) {
			var src = $puntersDemoFrame.attr('src'),
				newsrc = '';

			if (src.indexOf('#') != -1) {
				newsrc = src.split('#')[0] + '#start';
			} else {
				newsrc = src + '#start';
			}

			$puntersDemoFrame[0].src = newsrc;
			console.log('updated frame src to: ', newsrc);
		}
	};

	var $logo = $('#logo');
	$logo
		.off('dblclick.custom')
		.on('dblclick.custom', logoDblClickHandler);
})();
