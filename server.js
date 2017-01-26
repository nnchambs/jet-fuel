const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const md5 = require('md5');
const path = require('path');
const shortid = require('shortid');

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

app.locals.urls = [
  {
    id: 120938102983,
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
  const id = md5('folderID')
  const folder = request.body.foldername
    app.locals.folders.push({
      id: id,
      name: folder
    })
    response.json(app.locals.folders)
})

app.get('/folders/:folder_id', (request, response) => {
  const { id } = request.params.folder_id
  response.json(requestedFolder)
})

app.get('/urls', (request, response) => {
  response.json(app.locals.urls)
})

app.post('/urls', (request, response) => {
  const url = request.body.url
  app.locals.urls.push({
    id: md5('url'),
    folderId: 1,
    url: url,
    dateAdded: Date.now(),
    shortenedURL: `shor.ty/${shortid.generate()}`
  })
  response.json(app.locals.urls)
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is runnning on ${app.get('port')}`)
})
