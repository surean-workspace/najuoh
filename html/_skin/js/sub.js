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

        console.log($('.leftMenu__list-fc > li > a').not(this).parent().children('.depth2'));

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
});
