var folderSubmit = $('.folder-submit').val()
var folderInput = $('.folder-input').val()

$('.folder-submit').click(function(e) {
  e.preventDefault()
  var data = $('.folder-input').val()
  console.log(folderInput);
  $.ajax({
    type: "POST",
    url: 'http://localhost:3000/folders',
    data: data,
  })
})
