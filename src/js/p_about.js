'use strict';

$(document).ready(function() {
  $('.Callback-Button').click(function () {
    console.log('click!')
  });

  $('.Dealers-Slider').slick({
    slidesToShow: 3,
    prevArrow: $('.Dealers-SliderArrow:first-child > img'),
    nextArrow: $('.Dealers-SliderArrow:last-child > img'),
    dots: true,
    autoplay: true,
    mobileFirst: true,
    responsive: [{
      breakpoint: 1200,
      settings: {
        slidesToShow: 6
      }
    }, {
      breakpoint: 992,
      settings: {
        slidesToShow: 5
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 4
      }
    }
    ]
  });
  $('.Dealers-SliderArrow > img').click(function (e) {
    $(e.target).css('transform', 'scale(1.3)');
    setTimeout(function () {
      $(e.target).css('transform', '');
    }, 300);
  });

});