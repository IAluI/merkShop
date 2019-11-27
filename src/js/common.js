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
