$(function () {
	var photoSlider = $('.main_info .gallery-list--fc.latest').slick({
		dots: false,
		infinite: false,
		arrows: true,
		slidesToShow: 1,
		slideMargin: 10,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					dots: true,
					arrows: false,
				},
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					dots: true,
					arrows: false,
				},
			},
		],
	});
});
