;(function($, window, undefined) {
  'use strict';

  if ('undefined' === typeof window.Dtr) {
    var Dtr = window.Dtr = {};
  }

  $(document).ready(function() {
    //Util.CheckMobile();
   // Util.DeleteSelf();
    //Util.WindowFixed();
    //Util.MapApi();

    UI.TopBtn();
    UI.VisualSlider();
    UI.commonEffect();
    UI.popupDraggable();
    // UI.TabLink();

  });
  var Util = Dtr.Util = {
    CheckMobile: function() {
      if (!$.browser.desktop) {
        document.getElementsByTagName('html')[0].className += 'mobile';
      } else {
        document.getElementsByTagName('html')[0].className += 'pc';
      }
    },

    WindowInfo: function(parameter) {
      var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        h = d.getElementsByTagName('header')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight,
        t = w.scrollTop || e.scrollTop || g.scrollTop,
        b = (w.scrollTop || e.scrollTop || g.scrollTop) + y,
        r,
        /* Jquery Selector */
        $w = $(w),
        $b = $(g)

      switch (parameter) {
        case 'w':
          r = w;
          break;
        case 'g':
          r = g;
          break;
        case 'h':
          r = h;
          break;
        case 'x':
          r = x;
          break;
        case 'y':
          r = y;
          break;
        case 't':
          r = t;
          break;
        case 'b':
          r = b;
          break;
        case '$w':
          r = $w;
          break;
        case '$b':
          r = $b;
          break;
      }

      return r;
    },

    Dtr: function(agency) {
      if ($.browser.chrome) {
        console.log(agency, 'font-family:NanumGothic; font-size:15px; font-weight:700; color:#ED174F; padding:1px 5px 2px; background:#fff;');
      }
    },

    WindowViewAction: function(target, func) {
      var $target = $(target);
      var windowScrTop, windowScrBot, objTop, objBot, _this;

      var Action = function() {
        windowScrTop = Util.WindowInfo('t');
        windowScrBot = Util.WindowInfo('b');

        $target.each(function() {
          objTop = $(this).offset().top;
          _this = $(this);
          if (windowScrTop < objTop && objTop < windowScrBot) {
            func(_this);
          }
        });
      }

      $(window).bind('load scroll', Action);
    },

    WindowFixed: function() {
      var header = Util.WindowInfo('h'),
        $window = Util.WindowInfo('$w');
      $window.on('scroll resize', function() {
        var winWidth = window.innerWidth;
        var winScroll = ($window.scrollTop() || $("body").scrollTop());
        (winWidth >= 800 && winScroll > 50) ? header.classList.add('fixed'): header.classList.remove('fixed');
      }).resize().scroll();
    },

    DeleteSelf: function() {
      $('a').each(function() {
        if ($(this).attr('href') == '#self') {
          if (this.addEventListener) {
            this.addEventListener('click', function(e) {
              e.preventDefault();
            });
          } else {
            this.attachEvent('onclick', function(e) {
              e.returnValue = false;
            });
          }
        }
      });
    },

    GetParents: function(el, parentSelector) {
      var parentSelector = $(parentSelector)[0];

      if (parentSelector === undefined) {
        parentSelector = document;
      }

      var e = el;
      var r = e === parentSelector ? true : false;

      while (e !== parentSelector) {
        if (e === document) {
          break;
        } else {
          e = e.parentNode;
        }
      }

      r = e === parentSelector ? true : false;

      return r;
    }
  }

  var UI = Dtr.UI = {
    TopBtn: function() {
      var $window = Util.WindowInfo('$w');
      $window.scroll(function() {
        if ($window.scrollTop() > 300) {
			if ($('#footer').find('.top-btn').length == 0) {
				$('#footer').append($('<p class="top-btn">TOP</p>').hide().fadeIn(200, function(){
					$(this).addClass('on');
					
					$('.top-btn').on('click', function(e) {
						e.stopPropagation();
						TweenMax.to($window, 0.5, {
							scrollTo: 0
						});
					});
				}));
			} else {
				var scrollBottom = $(window).scrollTop() + $(window).outerHeight() - 30;
				var topBtn = $('#footer').offset().top + $('.top-btn').outerHeight()/2;
				if (scrollBottom >= topBtn) {
					$('.top-btn').addClass('fixed');
				} else {
					$('.top-btn').removeClass('fixed');
				}
			}
		} else {
			$('.top-btn').fadeOut(200, function(){$(this).remove();});
		}
      });
    },
    scrollAni: function() {
      var $window = Util.WindowInfo('$w'),
        $animation_elements = $('[class*="slide"]');

      function check_if_in_view() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($animation_elements, function() {
          var $element = $(this);
          var element_height = $element.outerHeight();
          var element_top_position = $element.offset().top + 100;
          var element_bottom_position = (element_top_position + element_height);

          //check to see if this current container is within viewport
          if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
            $element.addClass('in-view');
          } else {
            $element.removeClass('in-view');
          }
        });
      }
      $window.on('scroll resize', check_if_in_view);
      $window.trigger('scroll');
    },
    
    VisualSlider: function () {
		if ($('.main_visual__slider').hasClass('custom')) {
			// 슬라이드 효과 사용자 정의 - 디자인에 맞게 수정
			$('.main_visual__slider').off().on('init', function (event, slick) {
					// let's do this after we init the banner slider
					var el = $(slick.$slides[0]);
					slick_txt(el);
				})
				.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
					var el = $(slick.$slides[currentSlide]);
					var eltxt = el.find(".slider_item__inner__txtbox").children();
					TweenLite.to(eltxt, 0.5, {
						autoAlpha: 0,
						bottom: -20
					});
				})
				.on('afterChange', function (event, slick, currentSlide, nextSlide) {
					// finally let's do this after changing slides
					var el = $(slick.$slides[currentSlide]);
					slick_txt(el);
				})
				.slick({
					dots: true,
					fade: true,
					infinite: true,
					arrows: false,
					autoplay: true,
					speed: 800,
					slidesToShow: 1,
					autoplaySpeed: 6000,
					lazyLoad: 'ondemand',
					pauseOnHover: false,
					pauseOnFocus: false
				});

			function slick_txt(el) {
				var eltxt = el.find(".slider_item__inner__txtbox").children();
				$.each(eltxt, function (e) {
					var _ = $(this);
					var delay = 200;
					setTimeout(function () {
						TweenLite.fromTo(_, 0.5, {
							autoAlpha: 0,
							bottom: -20
						}, {
							autoAlpha: 1,
							bottom: 0
						});
					}, e * delay);
				})
			}
		} else {
			// 슬라이드 효과 템플릿
			var fadeFc;
			var infiniteFc;
			var speedFc;
			if ($('.main_visual__slider').hasClass('fade')) {
				fadeFc = true;
				infiniteFc = true;
				speedFc = 800;
			} else if ($('.main_visual__slider').hasClass('bounce')) {
				fadeFc = false;
				infiniteFc = false;
				speedFc = 400;
			} else {
				fadeFc = true;
				infiniteFc = true;
				speedFc = 800;
			}
			$('.main_visual__slider').off().on('init', function (event, slick) {
					// let's do this after we init the banner slider
					var el = $(slick.$slides[0]);
					slick_txt(el);
				})
				.on('beforeChange', function (event, slick, currentSlide, nextSlide, direction) {
					if ($('.main_visual__slider').hasClass('bounce')) {
						if (Math.abs(nextSlide - currentSlide) == 1) {
							if (direction = (nextSlide - currentSlide > 0)) {
								$('.main_visual__slider').addClass('backwrad');
							} else {
								$('.main_visual__slider').addClass('forward');
							}
						} else {
							if (direction = (nextSlide - currentSlide > 0)) {
								$('.main_visual__slider').addClass('backwrad');
							} else {
								$('.main_visual__slider').addClass('forward');
							}
						}
					}

					var el = $(slick.$slides[currentSlide]);
					var eltxt = el.find(".slider_item__inner__txtbox").children();
					TweenLite.to(eltxt, 0.5, {
						autoAlpha: 0,
						bottom: -20
					});
					var eltxt1 = el.find(".visual_text");
					TweenLite.to(eltxt1, 0.5, {
						autoAlpha: 0
					});
				})
				.on('afterChange', function (event, slick, currentSlide, nextSlide, direction) {
					$('.main_visual__slider').removeClass('forward backwrad');

					// finally let's do this after changing slides
					var el = $(slick.$slides[currentSlide]);
					slick_txt(el);
				})
				.slick({
					dots: true,
					fade: fadeFc,
					infinite: infiniteFc,
					arrows: false,
					autoplay: true,
					speed: speedFc,
					slidesToShow: 1,
					autoplaySpeed: 6000,
					lazyLoad: 'ondemand',
					pauseOnHover: false,
					pauseOnFocus: false
				});

			function slick_txt(el) {
				var eltxt = el.find(".slider_item__inner__txtbox").children();
				$.each(eltxt, function (e) {
					var _ = $(this);
					var delay = 200;
					setTimeout(function () {
						TweenLite.fromTo(_, 0.5, {
							autoAlpha: 0,
							bottom: -20
						}, {
							autoAlpha: 1,
							bottom: 0
						});
					}, e * delay);
				})
				var eltxt1 = el.find(".visual_text");
				$.each(eltxt1, function (e) {
					var _ = $(this);
					var delay = 500;
					setTimeout(function () {
						TweenLite.fromTo(_, 1.5, {
							autoAlpha: 0
						}, {
							autoAlpha: 1
						});
					}, e * delay);
				})
			}
		}
    },
	
	commonEffect: function(){
		var controller = new ScrollMagic.Controller();
		$('.common_effect').each(function(){
			var _ = $(this);
			var tween1 = function(){
				var el = _.find('.ce_item');
				$.each(el, function(e){
					var _ = $(this);
					setTimeout(function() {
						TweenLite.fromTo(_, 0.5, {position: 'relative', autoAlpha:0, bottom: '-30px'}, { autoAlpha:1, bottom: 0} )
					}, e * 200);
				})
			}
			var scene1 = new ScrollMagic.Scene({
				triggerElement: this,
				triggerHook: 'onEnter',
				offset: 250,
				reverse: false // once animating
			})
			.setTween(tween1)
			.addTo(controller);
		});
    },

	popupDraggable: function(){
		$('.main_layer_pop_box').each(function(i){
			var _top;
			var _left;

			$(this).draggable({
				containment:'parent',
				cancel: 'a, label',
				scroll:false,
				start: function() {
					var cookieObj = 'N';
					$.cookie('draggableCookie' + i, cookieObj);
				},
				stop: function() {
					_top = $(this).css('top');
					_left = $(this).css('left')
					
					var cookieObj = 'Y' + '%' + _top + '%' + _left;
					$.cookie('draggableCookie' + i, cookieObj, {
						expires : 365
					});
				}
			});

			var cookie = $.cookie('draggableCookie' + i);
			var mycookies;
			if (cookie != undefined) {
				mycookies = cookie.split('%');
				if (mycookies[0] == 'Y') {
					$(this).css({
						'top': mycookies[1],
						'left': mycookies[2]
					});
				}
			}
		});
    },
    
    TabLink : function(){
      // Javascript to enable link to tab
      var hash = document.location.hash;
      var prefix = "tab_";
      if (hash) {
        $('.nav-tabs a[href="'+hash.replace(prefix,"")+'"]').tab('show');
      }
      // Change hash for page-reload
      $('.nav-tabs a').on('shown', function (e) {
        window.location.hash = e.target.hash.replace("#", "#" + prefix);
      });
    }
  }
})(jQuery, window);

$(function(){
	var inTarget = $('.gnb .depth2 > li');
	inTarget.each(function(){
		if ($(this).find('ul').length != 0) {
			$(this).addClass('in');
		}
	});
	
	var mbInTarget = $('.gnb > ul > li');
	mbInTarget.each(function(){
		if ($(this).find('li').length != 0) {
			$(this).addClass('mb-in');
		}
	});
})

$(function(){
	
	$(".location-wrap ul.location-ul>li:not(.location-home)>a").click(function(e){
		e.preventDefault();
		$(".location-wrap ul.location-ul>li>a").not(this).next(".location-depth2").slideUp(200);
		$(this).next(".location-depth2").slideToggle(200);
	});
	
	// youtube popup (grt-youtube)
	$(".youtube-link").grtyoutube({
		autoPlay:true,
		theme: "dark"
	});
	
	if( $('.cateBox').length != 0 ) {
		if( $('.category_list--fc > li.on').length == 0 ) {
			$('.category_list--fc > li:first-child').addClass('on');
		}
	}
	
	// $('.tab_btn_box > ul li a').on('click', function (e) {
	// 	e.preventDefault();
	// 	var i = $(this).parent('li').index();
	// 	$('.tab_btn_box > ul li a').not(this).removeClass('on');
	// 	$(this).addClass('on');
	// 	$('.tab_conts_box > ul > li').hide();
	// 	$('.tab_conts_box > ul > li').eq(i).fadeIn(200);
	// });

	$('.tab_btn_box > ul li a').on('click', function (e) {
		e.preventDefault();
		let tabEventWrap = $(this).parents('.tab_event_wrap');
		let i = $(this).parent('li').index();
		$(this).parent('li').addClass('on').siblings().removeClass('on');
		tabEventWrap.find('.tab_conts_box > ul > li').hide();
		tabEventWrap.find('.tab_conts_box > ul > li').eq(i).fadeIn(200);

		if (tabEventWrap.find('.slick-slider').length != 0) {
			tabEventWrap.find('.slick-slider').slick('refresh');
		}

		if (tabEventWrap.find('.tab_conts_box > ul > li video').length != 0) {
			tabEventWrap.find('.tab_conts_box > ul > li video').each(function () {
				$(this).get(0).pause();
			});
		}
	});
	
});