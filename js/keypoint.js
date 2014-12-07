(function () {
	//vars
	var slides = $(".slide"),
		gallery,
		i,
		page,
		$menu = $("#menu");

	//init fast click
	$(function() {
		FastClick.attach(document.body);
	});

	//cancel touchmove on wrapper
	$("#wrapper").on('touchmove', function () {
		return false;
	});

	//bind key navigation behaviors
	window.onkeyup = function (event) {
		if (event.keyCode === 39) {
			return gallery.next();
		}
		if (event.keyCode === 37) {
			return gallery.prev();
		}
	}

	//bind menu behaviors
	$("#menu-btn").on('click', toggleMenu);
	$("#wrapper").on("click", function() {
		if ($menu.hasClass("visible")) {
			$menu.removeClass("visible");
		}
	});

	//bind hash change behavior
	window.onhashchange = function () {
		//get page index and go to page
		var p = parseInt(window.location.hash.substr(1)) || 0;
		gallery.goToPage(p);

		//call custom slide init
		if ( typeof(initSlideContent) != 'undefined' ) {
			initSlideContent(p);
		}
	}

	//init pretty print
	prettyPrint();

	//remove slides from DOM
	$("#slides").remove();

	//construct menu
	var liStr = "";
	for (var i=0; i<slides.length; i++) {
		var h1 = $("h1", slides[i]);
		liStr += '<li class="topcoat-list__item"><a href="#' + i + '">' + (h1[0] ? h1[0].innerText : '&nbsp;') + "</a></li>";
	}
	$("#list").html(liStr);

	//menu toggle handler
	function toggleMenu() {
		if ($menu.hasClass("visible")) {
			$menu.removeClass("visible");
		} else {
			$menu.addClass("visible");
		}
		return false;
	};

	//init gallery with slides
	gallery = new SwipeView('#wrapper', { numberOfPages: slides.length });

	//add slide contents to master pages
	for (i = 0; i < 3; i++) {
		page = i == 0 ? slides.length - 1 : i - 1;
		gallery.masterPages[i].appendChild(slides[page]);
	}

	//goto initial page, from hash index or first page
	setTimeout(function () {
		var p = parseInt(window.location.hash.substr(1)) || 0;
		gallery.goToPage(p);

		//call custom slide init
		if ( typeof(initSlideContent) != 'undefined' ) {
			initSlideContent(p);
		}
	});

	//on gallery flip
	gallery.onFlip(function (e) {
		var el,
			upcoming,
			i;

		//update hash
		window.location.hash = gallery.pageIndex;

		//swap slides content in masterpages
		for (i = 0; i < 3; i++) {
			upcoming = gallery.masterPages[i].dataset.upcomingPageIndex;
			if (upcoming != gallery.masterPages[i].dataset.pageIndex) {
				el = gallery.masterPages[i].querySelector('.slide');
				if (el) gallery.masterPages[i].removeChild(el);
				el = gallery.masterPages[i].appendChild(slides[upcoming]);
				if (el.className.indexOf(" loading") != -1) {
					el.className = el.className.replace(" loading", "");
				}
				el.className += " loading";
			}
		}
	});
}())
