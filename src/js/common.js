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

$(document).ready(function modalInit() {
  function modalView() {
    $('.ModalCallbackAba-Background').toggleClass('ModalCallbackAba-Background_hidden');
  }

  $('.ModalCallbackAba-Call, .ModalCallbackAba-Close, .ModalCallbackAba-Background').click(modalView);
  $('.ModalCallbackAba-Window').click(function (e) {
    e.stopPropagation();
  });

  $(".ModalCallbackAba-Window > form").submit(function(e) {
    e.preventDefault();

    var th = $(this);

    var formData = {};
    th.find('.ModalCallbackAba-FormData').each(function (index, item) {
      formData[index] = {
        name: item.name,
        value: $(item).val(),
        title: $(item).attr('data-title'),
        required: !!$(item).attr('required')
      };
    });
    formData['settings'] = JSON.stringify(window.formSettingsAba);

    console.log(formData);

    setTimeout(function() {
      $('.ModalCallbackAba-Success').html('');
      th.trigger("reset");
    }, 3000);

    $.ajax({
      type: "post",
      url: "/engine/api/forms/sendpagesform",
      data: formData
    })
      .done(function (msg) {
        console.log(msg);
        var obj = $.parseJSON(msg);
        if (obj.success === true) {
          $('.ModalCallbackAba-Success').html('Ваша заявка отправлена. Наши специалисты свяжутся с вами в ближайшее время.');
        }
        setTimeout(function() {
          $('.ModalCallbackAba-Background').addClass('ModalCallbackAba-Background_hidden');
          $('.ModalCallbackAba-Success').html('');
          th.trigger("reset");
        }, 3000);
      });
  });
});
