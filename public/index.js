$(document).ready(function(){
  getFolders()
  getURLS()
});

var folderSubmit = $('.folder-submit').val()
var folderInput = $('.folder-input').val()

$('.folder-submit').click(function(e) {
  e.preventDefault()
  var folder = $('.folder-input').val()
  $.ajax({
    type: "POST",
    url: '/folders',
    data: {
      foldername: folder
    }
  })
    .then(function(response) {
      $('.folder-list').empty()
      getFolders()
      populateDropdown(folder)
      getURLS()
    })
})

$('.url-submit').click(function(e) {
  e.preventDefault()
  var url = $('.url-input').val()
  var folder_id = $('option:selected').attr('id')
  console.log(folder_id);
  $.ajax({
    type: "POST",
    url: '/urls',
    data: {
      url: url,
      folder_id: folder_id,
      created_at: new Date
    }
  })
  .then($('.folder').empty(), function(){
    getURLS()
  })
})

function getFolders() {
  $.get('/folders', function(folders){
    folders.forEach(function(folder){
      $('.folder-list').append(
        `<div class="folder-container">
        <div class="folder-name-container">
        <div class="folder-name inline" >${folder.name}</div>
        </div>
        <div class="folder-buttons">
        <button class="inline folder-sort" onClick='getPop(${folder.id})'>Most Popular Links</button>
        <button class="inline folder-sort" onClick='getNewest(${folder.id})'>Newest Link</button>
        </div>
        </div>
        <div class="folder" id=${folder.id}></div>
        <br/>
        `
      )
      populateDropdown(folder)
    })
  })
}

function getPop(id) {
  $.get(`/urls/${id}/desc/counter`, function(urls){
    $(`#${id}.folder`).empty()
    urls.forEach(function(url) {
      $(`#${url.folder_id}.folder`).append(`
        <tr>
          <td><a id=${url.id} onClick='counter(${url.id})' >${url.shortened_url}</a></td>
          <td>Created at: ${url.created_at}</td>
          <td>Clicks: ${url.counter}</td>
        </tr>
      `)
    })
  })
}

function getNewest(id) {
  $.get(`/urls/${id}/desc/created_at`, function(urls){
    $(`#${id}.folder`).empty()
    urls.forEach(function(url) {
      $(`#${url.folder_id}.folder`).append(`
        <tr>
          <td><a id=${url.id} onClick='counter(${url.id})' >${url.shortened_url}</a></td>
          <td>Created at: ${url.created_at}</td>
          <td>Clicks: ${url.counter}</td>
        </tr>
      `)
    })
  })
}

function getURLS() {
  $.get('/urls', function(urls) {
    urls.forEach(function(url) {
      $(`#${url.folder_id}.folder`).append(`
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
      $('.folder').empty()
      getURLS()
    })
  })
}

populateDropdown = (folder) => {
  $('.folder-select').append(`
    <option id=${folder.id}>${folder.name}</option>
    `)
}
