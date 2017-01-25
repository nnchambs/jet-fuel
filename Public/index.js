var folderInput = $('.folder-input').val()
var folderSubmit = $('.folder-submit').val()

$('.folder-submit').click(function(e) {
  e.preventDefault()
  var data = $('.folder-input').val()
  $.ajax({
    type: "POST",
    url: 'http://localhost:3000/folders',
    data: data,
  })
})
