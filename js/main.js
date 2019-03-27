(function($) {

  $('#jerseySize').parent().append('<ul class="list-item" id="newjerseySize" name="jerseySize"></ul>');
  $('#jerseySize option').each(function(){
      $('#newjerseySize').append('<li value="' + $(this).val() + '">'+$(this).text()+'</li>');
  });
  $('#jerseySize').remove();
  $('#newjerseySize').attr('id', 'jerseySize');
  $('#jerseySize li').first().addClass('init');
  $("#jerseySize").on("click", ".init", function() {
      $(this).closest("#jerseySize").children('li:not(.init)').toggle();
  });
  
  var allOptions = $("#jerseySize").children('li:not(.init)');
  $("#jerseySize").on("click", "li:not(.init)", function() {
      allOptions.removeClass('selected');
      $(this).addClass('selected');
      $("#jerseySize").children('.init').html($(this).html());
      allOptions.toggle();
  });   

  var marginSlider = document.getElementById('slider-margin');
  if (marginSlider != undefined) {
      noUiSlider.create(marginSlider, {
            start: [5],
            step: 1,
            connect: [true, false],
            tooltips: [true],
            range: {
                'min': 0,
                'max': 10
            },
            format: wNumb({
                decimals: 0,
                thousand: ',',
                prefix: ' ',
            })
    });
  }
    
    
    var marginSlider = document.getElementById('slider-margin1');
  if (marginSlider != undefined) {
      noUiSlider.create(marginSlider, {
            start: [5],
            step: 1,
            connect: [true, false],
            tooltips: [true],
            range: {
                'min': 0,
                'max': 10
            },
            format: wNumb({
                decimals: 0,
                thousand: ',',
                prefix: ' ',
            })
    });
  }
    
    
    
  $('#reset').on('click', function(){
      $('#register-form').reset();
  });

  $('#register-form').validate({
    rules : {
        first_name : {
            required: true,
        },
        last_name : {
            required: true,
        },
        email : {
            required: true,
            email : true
        },
        phone_number : {
            required: true,
        }
    },
    onfocusout: function(element) {
        $(element).valid();
    },
});

    jQuery.extend(jQuery.validator.messages, {
        required: "",
        remote: "",
        email: "",
        url: "",
        date: "",
        dateISO: "",
        number: "",
        digits: "",
        creditcard: "",
        equalTo: ""
    });
})(jQuery);
