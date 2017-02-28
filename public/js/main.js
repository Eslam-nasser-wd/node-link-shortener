$(function(){
    $('form').submit(function(e) {
      e.preventDefault()

      var new_url = {
       long_url: $('#user_url').val()
      }

      $.ajax({
       url: '/shortener',
       type: 'POST',
       data: new_url,
      })
      .done(function(e) {
        var short_url = e.site + e.key

        $('#generated_url').val(short_url)
        $('.show-link-warpper a').attr('href', short_url)
        $('.input-warpper').fadeOut('fast', function() {
          $('.show-link-warpper').fadeIn('fast');
        });

        var how_many = parseInt($('.how-many span').text());
        how_many++
        $('.how-many span').text(how_many)
      })
      .fail(function(e) {
        console.log("error", e);
      })
      .always(function(e) {
        // console.log("complete");
      });
    });
    
})
