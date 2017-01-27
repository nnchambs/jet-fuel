var folderSubmit = $('.folder-submit').val()
var folderInput = $('.folder-input').val()

$('.folder-submit').click(function(e) {
  e.preventDefault()
  var folder = $('.folder-input').val()
  console.log( folder );
  $.ajax({
    type: "POST",
    url: '/folders',
    data: {
      foldername: folder
    }
  })
    .then(function(response) {
      $('.folder-list').empty()
      response.forEach(function(folder){
        $('.folder-list').append(
          `<div class="${folder.id}">- ${folder.name}</div>`
        )
        populateDropdown(folder)
      })
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
})

$.get('/folders', function(folders){
  folders.forEach(function(folder){
    $('.folder-list').append(
      `<div class="folder" id=${folder.id}>- ${folder.name}</div>`
    )
    populateDropdown(folder)
    getURLS()
  })
})

getURLS = () => {
  $.get('/urls', function(urls) {
    urls.forEach(function(url) {
      console.log(url.folder_id);
      $(`#${url.folder_id}.folder`).append(`
        <li>
          <div>
            <a id=${url.id} href='${url.url}' >${url.shortened_url}</a>
            <p>Created at: ${url.created_at}</p>
          </div>
        </li>
      `)
    })
  })
}


populateDropdown = (folder) => {
  $('.folder-select').append(`
    <option id=${folder.id}>${folder.name}</option>
    `)
}
