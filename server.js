const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const md5 = require('md5');
const path = require('path')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.Port || 3000)
app.locals.title = 'Shor.ty'
app.locals.folders = [
  {
    id: 120938102983,
    name: 'coolsites'
  },
  {
    id: 120938102983,
    name: 'sweetsites'
  }
]

app.locals.url = [
  {
    id: 123213,
    folderId: 1,
    url: 'http://wwww.hahah.com',
    shortenedURL: 'short.ty/123213',
    counter: 1,
    dateAdded: Date.now()
  }
]

app.use('/', express.static(__dirname + '/public'))

// app.get('/', (request, response) => {
//   response.sendFile(path.join(__dirname + '/index.html'));
//   // response.send("hello world")
// })

app.get('/folders', (request, response) => {
  response.send(app.locals.folders)
})

app.post('/folders', (request, response) => {
  const id = Date.now()
  const folder = request.body.foldername
  if(app.locals.folders[id]){
    response.send('Duplicate folder, please rename the folder and then take a lap.')
  } else {
    app.locals.folders.push({
      id: id,
      name: folder
    })
    console.log('folders', app.locals.folders)
    response.json(app.locals.folders)
  }
})

app.get('/folders/:folder_name', (request, response) => {
  const { folderName } = request.params
  console.log(app.locals.folders[folderName])
  response.json(app.locals.folders[folderName])
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is runnning on ${app.get('port')}`)
})
