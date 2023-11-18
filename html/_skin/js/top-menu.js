$(function () {
	// menu button
	var num = 0;
	var flag = true;
	$('.m-menu-btn')
		.unbind('click')
		.bind('click', function () {
			num++;
			if (flag) {
				$('#header .m-gnb-bg').fadeIn();
				$('#header .gnb').animate({ right: 0, opacity: 1 }, 500);
				$('#header .m-lang').animate({ right: 0, opacity: 1 }, 500);
				//			$("body").css("overflow","hidden");
				$('body').addClass('gnb-open');
				flag = false;
			} else {
				$('#header .m-gnb-bg').fadeOut();
				$('#header .gnb').animate({ right: -100 + '%', opacity: 1 }, 500);
				$('#header .m-lang').animate({ right: -100 + '%', opacity: 0 }, 500);
				flag = true;
				//			$("body").css("overflow","visible");
				$('body').removeClass('gnb-open');
			}
			$(this).toggleClass('on');
		});

	// gnb current menu
	var _pathname = location.pathname;
	_pathname = _pathname.split('/');
	if ($('html').attr('lang') == 'ko') {
		_pathname = _pathname[1];
	} else {
		_pathname = _pathname[2];
	}
	$('#header .gnb > ul > li > a').each(function () {
		var _href = $(this).attr('href');
		if (_href.indexOf(_pathname) != -1) $(this).addClass('current');
	});

	// mobile 2depth
	function gnbClickOn() {
		$('.gnb>ul>li>a')
			.unbind('click')
			.bind('click', function (e) {
				var tag = $(this).parent('li').find('li');
				if (tag.length != 0) {
					e.preventDefault();
					$('.gnb>ul>li>a').not(this).parent().removeClass('on').children('ul').slideUp(200);
					$(this)
						.parent()
						.addClass('on')
						.children('ul')
						.slideToggle(200, function () {
							if ($(this).css('display') == 'none') {
								$(this).parent().removeClass('on');
							}
						});
				}
			});
	}
	function gnbClickOff() {
		$('.gnb>ul>li>a')
			.unbind('click')
			.bind('click', function (e) {
				e.stopPropagation();
			});
	}
	$(document).ready(function () {
		if (matchMedia('screen and (max-width: 1199px)').matches) {
			gnbClickOn();
		} else {
			gnbClickOff();
		}

		$('#searchBtn').on('click', function (e) {
			e.preventDefault();
			$('.search_box').toggleClass('block');
		});
	});
	$(window).on('load resize', function () {
		if (matchMedia('screen and (max-width: 1199px)').matches) {
			gnbClickOn();
		} else {
			gnbClickOff();
		}
	});

	// var sta = 50;
	$(window).scroll(function () {
		var w = $(window).width() + 18;
		var sta = $('.sta').outerHeight();
		if ($(window).scrollTop() >= sta) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	});
	$(window).on('load resize', function () {
		var w = $(window).width() + 18;
		var sta = $('.sta').outerHeight();
		if ($(window).scrollTop() >= sta) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	});

	/* sitemap */
	var headerSitemap = $('#headerSitemap');
	var gnbList = $('#header .gnb > ul');
	gnbList.clone().appendTo(headerSitemap);

	var sitemapBtn = $('.pc_sitemap_btn');
	sitemapBtn.on('click', function () {
		$(this).toggleClass('on');
		headerSitemap.toggleClass('on');
	});

	/* footer sitemap */
	var footerSitemapOrigin = gnbList.clone().addClass('sitemap');
	var footerSitemap = gnbList.clone().addClass('sitemap');
	footerSitemap.find('>li').each(function () {
		$(this).children().wrapAll('<div class="menu-wrap"></div>');
	});
	var menu1 = footerSitemap.find('>li').eq(2).find('div');
	var menu2 = footerSitemap.find('>li').eq(4).find('div');
	menu1.appendTo(footerSitemap.find('>li').eq(1));
	menu2.appendTo(footerSitemap.find('>li').eq(3));
	footerSitemap.find('>li').eq(2).remove();
	footerSitemap.find('>li').eq(3).remove();

	//
	function addSitemap() {
		if ($(window).width() >= 768) {
			$('#footerSitemap .footer-inner').html('');
			footerSitemap.appendTo('#footerSitemap .footer-inner');
		} else {
			$('#footerSitemap .footer-inner').html('');
			footerSitemapOrigin.appendTo('#footerSitemap .footer-inner');
		}
	}
  addSitemap();
	$(window).on('resize', function () {
		addSitemap();
	});

	/* footer family site */
	$(function () {
		$('.familySite h3 a').on('click', function (e) {
			e.preventDefault();
			if ($('.familySite').hasClass('on')) {
				$('.familySite').removeClass('on');
				$('.footSelect > ul').slideUp();
			} else {
				$('.familySite').addClass('on');
				$('.footSelect > ul').slideDown();
			}
		});
		$(document).click(function (event) {
			if (!$(event.target).closest('.familySite').length) {
				$('.familySite').removeClass('on');
				$('.footSelect > ul').slideUp();
			}
		});
	});

	// 전자족보
	/* if ($('.header__sta .sta__btn-genealogy').length === 1) {
		var btn = $('.header__sta .sta__btn-genealogy');
		var cloneBtn = btn.clone();
		var breakpoint = 576;

		if ($(window).width() < breakpoint) {
			cloneBtn.prependTo('#header .sta > .inner');
		} else {
			cloneBtn.remove();
		}

		$(window).on('resize', function () {
			if ($(window).width() < breakpoint) {
				cloneBtn.prependTo('#header .sta > .inner');
			} else {
				cloneBtn.remove();
			}
		});
	} */
});
