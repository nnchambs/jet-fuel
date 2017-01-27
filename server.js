const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const md5 = require('md5');
const path = require('path');
const shortid = require('shortid');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.Port || 3000)
app.locals.title = 'Shor.ty'
app.use('/', express.static(__dirname + '/public'))

// app.get('/', (request, response) => {
//   response.sendFile(path.join(__dirname + '/index.html'));
//   // response.send("hello world")
// })

app.get('/folders', (request, response) => {
  database('folders').select()
    .then(function(folders){
      response.status(200).json(folders)
    })
    .catch(function(error) {
      console.log('Nah')
    })
})

app.post('/folders', (request, response) => {
  const id = md5('folder_id')
  const folder = request.body.foldername
   database('folders').insert({name: folder})
  .then(function() {
    database('folders').select()
      .then(function(folders) {
        response.status(200).json(folders)
      })
      .catch(function(error) {
        console.error('Nah')
      });
  })
})

app.get('/folders/:folder_id', (request, response) => {
  const { id } = request.params.folder_id
  response.json(requestedFolder)
})

app.get('/urls', (request, response) => {
  database('urls').select()
    .then(function(urls){
      response.status(200).json(urls)
    })
    .catch(function(error) {
      console.log('Nah')
    })
})

app.post('/urls', (request, response) => {
  const url = request.body.url
  const shortened_url = shortid.generate()
  const folder_id = 3
  const id = md5('url_id')
  database('urls').insert({url: url, shortened_url: shortened_url, folder_id: 3, created_at: new Date})
 .then(function() {
   database('urls').select()
     .then(function(url) {
       response.status(200).json(url)
     })
     .catch(function(error) {
       console.error('Nah')
     });
 })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is runnning on ${app.get('port')}`)
})
