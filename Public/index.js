var folderSubmit = $('.folder-submit').val()
var folderInput = $('.folder-input').val()

$('.folder-submit').click(function(e) {
  e.preventDefault()
  var folder = $('.folder-input').val()
  console.log( folder );
  $.ajax({
    type: "POST",
    url: '/folders',
    data: folder
  })
})

$.get('/folders', function(folders){
  folders.forEach(function(folder){
    $('.folder-list').append(
      `<div class="${folder.id}">- ${folder.name}</div>`
    )
  })
})

$.get('/urls', function(urls){

  // urls.forEach(function(url){
  //   if()
  // })
})
