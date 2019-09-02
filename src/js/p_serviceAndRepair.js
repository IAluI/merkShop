'use strict';

$(document).ready(function() {
  $('a[href^="#"]').click(function (e) {
    e.preventDefault();
    var id = $(this).attr('href');
    var top = $(id).offset().top;
    $('html, body').animate({
      scrollTop: top - window.fixHeaderHight
    }, 350);
  });

});