const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const md5 = require('md5');
const path = require('path')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.Port || 3000)
app.locals.title = 'Shor.ty'
app.locals.folders = {
  andrew: 'I am a banana'
}

app.use('/', express.static(__dirname + '/public'))

// app.get('/', (request, response) => {
//   response.sendFile(path.join(__dirname + '/index.html'));
//   // response.send("hello world")
// })

app.get('/folders', (request, response) => {
  response.send(app.locals.folders)
})

app.get('/folders/:folder_name', (request, response) => {
  response.json(app.locals.folders)
})

app.post('/folders', (request, response) => {
  const id = Date.now()
  const folder = request.body.foldername
  if(app.locals.folders[folder]){
    response.send('Duplicate folder, please rename the folder and then take a lap.')
  } else {
    app.locals.folders[folder] = {}
    console.log(request.body.foldername);
    response.json( app.locals.folders[folder] )
  }
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is runnning on ${app.get('port')}`)
})
