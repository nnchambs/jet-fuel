const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const md5 = require('md5');
const path = require('path');
const shortid = require('shortid');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const knex = require('knex')(configuration);
const helpers = require('./helperfriends.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.Port || 3000)
app.locals.title = 'Shor.ty'
app.use('/', express.static(__dirname + '/public'))

app.get('/folders', (request, response) => {
  helpers.getFolders(response)
})

app.post('/folders', (request, response) => {
  const folder = request.body.foldername
  helpers.postNewFolder(folder, response);
})

app.get('/urls', (request, response) => {
  helpers.getUrls(response)
})

app.post('/urls', (request, response) => {
  const url = request.body.url
  const shortened_url = shortid.generate()
  const folder_id = request.body.folder_id
  const id = md5('url_id')
  helpers.postNewUrl(url, shortened_url, folder_id, id, response)
})

app.put('/urls', (request, response) => {
  const id = 820922
  knex('urls').where('id', '=', id).increment('counter', '+', 1)
  .then(function(response) {
    response.status(200).json(response)
  })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is runnning on ${app.get('port')}`)
})
