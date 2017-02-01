$(document).ready(function(){
  getPolls()
  getURLS()
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
      pollname: poll
    }
  })
    .then(function(response) {
      $('.poll-list').empty()
      getPolls()
      populateDropdown(poll)
      getURLS()
    })
})

$('.url-submit').click(function(e) {
  e.preventDefault()
  var url = $('.url-input').val()
  var poll_id = $('option:selected').attr('id')
  console.log(poll_id);
  $.ajax({
    type: "POST",
    url: '/urls',
    data: {
      url: url,
      poll_id: poll_id,
      created_at: new Date
    }
  })
  .then($('.poll').empty(), function(){
    getURLS()
  })
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
      populateDropdown(poll)
    })
  })
}

function getPop(id) {
  $.get(`/urls/${id}/desc/counter`, function(urls){
    $(`#${id}.poll`).empty()
    urls.forEach(function(url) {
      $(`#${url.poll_id}.poll`).append(`
        <tr>
          <td><a id=${url.id} onClick='counter(${url.id})' >${url.shortened_url}</a></td>
          <td>Created at: ${url.created_at}</td>
          <td>Clicks: ${url.counter}</td>
          <td><button onClick='deleteUrl(${url.id})'>Delete URL</button></td>
        </tr>
      `)
    })
  })
}

function getNewest(id) {
  $.get(`/urls/${id}/desc/created_at`, function(urls){
    $(`#${id}.poll`).empty()
    urls.forEach(function(url) {
      $(`#${url.poll_id}.poll`).append(`
        <tr>
          <td><a id=${url.id} onClick='counter(${url.id})' >${url.shortened_url}</a></td>
          <td>Created at: ${url.created_at}</td>
          <td>Clicks: ${url.counter}</td>
          <td><button onClick='deleteUrl(${url.id})'>Delete URL</button></td>
        </tr>
      `)
    })
  })
}

function getURLS() {
  $.get('/urls', function(urls) {
    urls.forEach(function(url) {
      $(`#${url.poll_id}.poll`).append(`
          <tr>
            <td><a id=${url.id} onClick='counter(${url.id})' >${url.shortened_url}</a></td>
            <td>Created at: ${url.created_at}</td>
            <td>Clicks: ${url.counter}</td>
            <td><button onClick='deleteUrl(${url.id})'>Delete URL</button></td>
          </tr>
      `)
    })
  })
}



function counter(id) {
  $.get(`/urls/${id}`, function(data) {
    console.log(data[0]);
    const powerUp = data[0].counter + 1

    $.ajax({
      url: `/urls/${data[0].id}`,
      type: 'patch',
      data: {
        counter: powerUp
      }
    })
    window.location.href = `${data[0].url}`
  })
}

function deleteUrl(id) {
  $.get(`/urls/${id}`, function() {

    $.ajax({
      url: `/urls/${id}`,
      type: 'delete'
    })
    .then(function(response) {
      $('.poll').empty()
      getURLS()
    })
  })
}

populateDropdown = (poll) => {
  $('.poll-select').append(`
    <option id=${poll.id}>${poll.name}</option>
    `)
}
