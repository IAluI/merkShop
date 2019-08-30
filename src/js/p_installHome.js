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

  /*var installStepsSlider = new Swiper ('.InstallSteps-Slider', {
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 3,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });*/

  var installStepsSlider = swiperInit({
    mediaQ: '(min-width: 1230px)',
    swiperContainer: '.InstallSteps-Slider',
    swiperOptions: {
      grabCursor: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      slidesPerView: 1,
      breakpointsInverse: true,
      breakpoints: {
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        }
      },
    }
  });

  var unstdInstallSlider = swiperInit({
    mediaQ: '(min-width: 1230px)',
    swiperContainer: '.UnstdInstall-Slider',
    swiperOptions: {
      grabCursor: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      slidesPerView: 1,
      breakpointsInverse: true,
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
      },
    }
  });

  var stdInstallSlider1 = swiperInit({
    mediaQ: '(min-width: 1230px)',
    swiperContainer: '.StdInstall-Variant1',
    swiperOptions: {
      grabCursor: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      slidesPerView: 1,
      breakpointsInverse: true,
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
      },
      observer: true,
    }
  });

  var stdInstallSlider2 = swiperInit({
    mediaQ: '(min-width: 1230px)',
    swiperContainer: '.StdInstall-Variant2',
    swiperOptions: {
      grabCursor: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      slidesPerView: 1,
      breakpointsInverse: true,
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
      },
      observer: true,
    }
  });

  var stdInstallSlider3 = swiperInit({
    mediaQ: '(min-width: 1230px)',
    swiperContainer: '.StdInstall-Variant3',
    swiperOptions: {
      grabCursor: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      slidesPerView: 1,
      breakpointsInverse: true,
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
      },
      observer: true,
    }
  });
});
