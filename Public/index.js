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

$.get('/folders', function(folders){
  folders.forEach(function(folder){
    $('.folder-list').append(
      `<div class="${folder.id}">- ${folder.name}</div>`
    )
    populateDropdown(folder)
  })
})

populateDropdown = (folder) => {
  $('.folder-select').append(`
    <option id=${folder.id}>${folder.name}</option>
    `)
}

$.get('/urls', function(urls){

  // urls.forEach(function(url){
  //   if()
  // })
})
