$(document).ready(function(){
  getPolls()
});

var pollSubmit = $('.poll-submit').val()
var pollInput = $('.poll-input').val()

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
    // .then(function(response) {
    //   $('.poll-list').empty()
    //   getPolls()
    //   populateDropdown(poll)
    // })
})

function getPolls() {
  $.get('/polls', function(polls){
    polls.forEach(function(poll){
      $('.poll-list').append(
        `<div class="poll-container">
        <div class="poll-name-container">
        <div class="poll-name inline" >${poll.name}</div>
        </div>
        <div class="poll-buttons">
        <button class="inline poll-sort" onClick='getPop(${poll.id})'>Most Popular Links</button>
        <button class="inline poll-sort" onClick='getNewest(${poll.id})'>Newest Link</button>
        </div>
        </div>
        <div class="poll" id=${poll.id}></div>
        <br/>
        `
      )
    })
  })
}

function deletePoll(id) {
  $.get(`/polls/${id}`, function() {

    $.ajax({
      url: `/polls/${id}`,
      type: 'delete'
    })
    .then(function(response) {
      $('.poll').empty()
      getPolls()
    })
  })
}

populateDropdown = (poll) => {
  $('.poll-select').append(`
    <option id=${poll.id}>${poll.name}</option>
    `)
}
