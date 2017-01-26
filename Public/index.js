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

$.get('/folders', function(data){
  var folderList = $('.folder-list')
  data.forEach(function(e){
    $('.folder-list').append(
      `<div class="${e.id}">${e.name}</div>`
    )
  })
})
