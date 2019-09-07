$(document).ready(function() {
  /*
   Запись в глобальный объект настроек формы
   */
  window.formSettingsAba = {
    mail_subject: 'Заявка со страницы "Обслуживание и ремонт кондиционеров"',
    mail_text: ''
  };

  $('a[href^="#"]').click(function (e) {
    e.preventDefault();
    var id = $(this).attr('href');
    var top = $(id).offset().top;
    $('html, body').animate({
      scrollTop: top
    }, 350);
  });

});