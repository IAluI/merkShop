'use strict';

$(document).ready(function() {
  $('a[href^="#"]').click(function (e) {
    e.preventDefault();
    var id = $(this).attr('href');
    var top = $(id).offset().top;
    $('html, body').animate({
      scrollTop: top
    }, 350);
  });

  $('.StdInstall-CaseImg').slick({
    slidesToShow: 1,
    dots: true,
    arrows: false,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          dots: false
        }
      }
    ]
  });

  (function unStdInstallSlider() {
    var root = $('.UnStdInstall-Cases');
    var isDestroyed = false;
    var media = window.matchMedia('(max-width: 767px)');
    function slickInit() {
      root.slick({
        slidesToShow: 1,
        dots: true,
        arrows: false,
        mobileFirst: true,
        responsive: [
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 767,
            settings: 'unslick'
          }
        ]
      }, true);
      console.log(slickInit)
    };

    root.on('destroy', function(){
      isDestroyed = true;
    });
    slickInit();
    $(window).resize($.debounce(250, function () {
      console.log(isDestroyed);
      console.log(media.matches);
      if (media.matches && isDestroyed) {
        slickInit();
        isDestroyed = false;
      }
    }));
  })();

});