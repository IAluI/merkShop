/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);

function swiperInit(options) {
  /*
  options = {
    mediaQ: 'string',
    swiperContainer: 'element or selector',
    swiperOptions: 'object'
  };
  */
  var breakpoint = window.matchMedia(options.mediaQ);
  var mySwiper;
  function breakpointChecker() {
    if (breakpoint.matches === true) {
      if (mySwiper !== undefined) {
        mySwiper.destroy(true, true);
      }
      return;
    } else if (breakpoint.matches === false) {
      return enableSwiper();
    }
  }
  function enableSwiper() {
    mySwiper = new Swiper(options.swiperContainer, options.swiperOptions);
  }

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();

  return mySwiper;
}

$(document).ready(function navSliders() {
  /*
    Плавный переход по ссылке внутри страницы
   */
  $('a[href^="#"]').click(function (e) {
    e.preventDefault();
    var id = $(this).attr('href');
    var top = $(id).offset().top;
    var header = $('.NavBarAba').outerHeight();
    $('html, body').animate({
      scrollTop: top - header
    }, 350);
  });
  /*
   Инициализация слайдера навигационного меню
   */
  var navSwiper = new Swiper('.NavBarAba', {
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    freeMode: true,
    slidesPerView: 'auto',
  });
  /*
   Трансформация позиционирования меню из статического в фиксированное
   */
  function fixNavBar() {
    var navBar = $('.NavBarAba');
    var navBarOffset = $('.NavBarAba').offset().top;
    var navBarHeight = navBar.outerHeight();
    var isFixedPrev = false, isFixedCur = false;

    return function () {
      isFixedCur = $(window).scrollTop() > navBarOffset;
      if (isFixedCur === isFixedPrev) {
        return;
      }
      isFixedPrev = isFixedCur;
      if(isFixedCur) {
        console.log('ok')
        navBar.addClass('NavBarAba_fixed');
        $('.SectionAba:first').css('margin-top', navBarHeight);
      } else {
        navBar.removeClass('NavBarAba_fixed');
        $('.SectionAba:first').css('margin-top', 0);
      }
    };
  }

  $(window).scroll($.throttle(250, false, fixNavBar()));

  $('.NavBarAba-Link:first').addClass("NavBarAba-Link_active");
  function highlightMenuItem() {
    var winScroll = $(window).scrollTop();
    var header = $('.NavBarAba').outerHeight();

    $('.NavBarAba-Link').each(function(){
      var hash = $(this).attr("href");
      var target = $(hash);
      if (target.offset().top - header <= winScroll && target.offset().top - header + target.outerHeight() > winScroll) {
        $('.NavBarAba-Link_active').removeClass("NavBarAba-Link_active");
        $(this).addClass("NavBarAba-Link_active");
        return false;
      }
    });
  }

  $(window).scroll($.throttle(250, highlightMenuItem));

});

(function linkAnimate() {

})();