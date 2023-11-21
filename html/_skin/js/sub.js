$(function () {
	if ($('.sub-wrap-conts').attr('data-desc')) {
		var desc = $('.sub-wrap-conts').attr('data-desc');
		$('.subCommon--fc h2+p').text(desc);
	}

	$('.leftMenu__list-fc > li > a')
		.unbind('click')
		.bind('click', function (e) {
			console.log(this);
			var tag = $(this).parent('li').find('li');
			if (tag.length != 0) {
				e.preventDefault();
				$(this).next('.depth2').slideToggle(200);

				$('.leftMenu__list-fc > li > a').not(this).parent().children('.depth2').slideUp(200);
				/* $(this)
					.parent()
					.children('.depth2')
					.slideToggle(200, function () {
						if ($(this).css('display') == 'none') {
							// $(this).parent().removeClass('on');
						}
					}); */
			}
		});

	$('.genealogy__nav__depth3').siblings().addClass('in');

	$('.genealogy__nav--fc .genealogy__nav__depth2 > div.left').wrapAll('<div class="menu-left"></div>');
	$('.genealogy__nav--fc .genealogy__nav__depth2 > div.right').wrapAll('<div class="menu-right"></div>');

	$('.genealogy__nav__depth2 .depth-inner > a')
		.unbind('click')
		.bind('click', function (e) {
			console.log(this);
			var tag = $(this).parents('.depth-inner').find('li');
			if (tag.length != 0) {
				e.preventDefault();
				$(this).next('.genealogy__nav__depth3').slideToggle(200);
			}
		});

	var photoOverlay = '<div class="overlay-photo"></div>';
	$('.modal__photo-list a')
		.unbind('click')
		.bind('click', function (e) {
			e.preventDefault();
			var img = $(this).find('.thumb__img > img').attr('src');
			var imgView =
				'<div class="photo-view--fc"><button class="photo-close"><span class="photo-close__btn">X</span></button><div class="photo-view__inner--fc"><img src="' + img + '" alt="image"/></div></div>';
			if ($('.photo-view--fc').length !== 0) {
				$('.photo-view--fc .photo-view__inner--fc').html(imgView);
			} else {
				$('body').append(imgView);
			}
			$('body').append(photoOverlay);
		});

	$(document).on('click', '.photo-close, .overlay-photo, .photo-view--fc', function () {
		$('.photo-view--fc, .overlay-photo').remove();
	});

	$(document).on('change', '.filebox .upload-hidden', function () {
		if (window.FileReader) {
			// modern browser
			var filename = $(this)[0].files[0].name;
		} else {
			// old IE
			var filename = $(this).val().split('/').pop().split('\\').pop();
		}

		$(this).parent().parent('.filebox').find('.upload-name').val(filename);
	});
});
