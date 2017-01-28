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
  $('.folder').empty()
  getURLS()
})

function getFolders() {
  $.get('/folders', function(folders){
    folders.forEach(function(folder){
      $('.folder-list').append(
        `<div class="folder-container">
        <div class="folder-name inline" >- ${folder.name}</div>
        <button class="inline" onClick='getPop(${folder.id})'>Most Popular Links</button>
        <button class="inline" onClick='getNewest(${folder.id})'>Newest Link</button>
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
        <li class="urls" style="list-style: none;">
          <div>
            <a id=${url.id} onClick='counter(${url.id})' >${url.shortened_url}</a>
            <p>Created at: ${url.created_at}</p>
            <p>Clicks: ${url.counter}</p>
          </div>
        </li>
      `)
    })
  })
}

function getNewest(id) {
  $.get(`/urls/${id}/desc/created_at`, function(urls){
    $(`#${id}.folder`).empty()
    urls.forEach(function(url) {
      $(`#${url.folder_id}.folder`).append(`
        <li class="urls" style="list-style: none;">
          <div>
            <a id=${url.id} onClick='counter(${url.id})' >${url.shortened_url}</a>
            <p>Created at: ${url.created_at}</p>
            <p>Clicks: ${url.counter}</p>
          </div>
        </li>
      `)
    })
  })
}

function getURLS() {
  $.get('/urls', function(urls) {
    urls.forEach(function(url) {
      $(`#${url.folder_id}.folder`).append(`
        <li class="urls" style="list-style: none;">
          <div>
            <a id=${url.id} onClick='counter(${url.id})' >${url.shortened_url}</a>
            <p>Created at: ${url.created_at}</p>
            <p>Clicks: ${url.counter}</p>
          </div>
        </li>
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

populateDropdown = (folder) => {
  $('.folder-select').append(`
    <option id=${folder.id}>${folder.name}</option>
    `)
}
