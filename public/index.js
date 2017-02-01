$('.poll-submit').click(function(e) {
  e.preventDefault()
  var poll = $('.poll-input').val()
  var opt_one = $('.opt-one').val()
  var opt_two = $('.opt-two').val()
  var opt_three = $('.opt-three').val()
  var opt_four = $('.opt-four').val()
  $.ajax({
    type: "POST",
    url: '/polls',
    data: {
      poll: poll,
      opt_one: opt_one,
      opt_two: opt_two,
      opt_three: opt_three,
      opt_four: opt_four
    }
  })
  $('.input' ).val('');
})
