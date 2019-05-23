'use strict';

$(document).ready(function() {
  $('.StdInstall-CaseImg').slick({
    slidesToShow: 1,
    dots: true,
    arrows: false,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: ($('.StdInstall-CaseImg').children().length - 1)
        }
      }, {
        breakpoint: 1023,
        settings: {
          slidesToShow: $('.StdInstall-CaseImg').children().length,
          dots: false
        }
      }
    ]
  });

  $('a[href^="#"]').click(function (e) {
    e.preventDefault();
    var id = $(this).attr('href');
    var top = $(id).offset().top;
    $('html, body').animate({
      scrollTop: top
    }, 350);
  });
});