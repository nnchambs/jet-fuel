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

app.get('/urls/:id', (request, response) => {
  const { id } = request.params
  database('folders').select().table('urls').where('id', id)
          .then(function(urls) {
            response.status(200).json(urls);
          })
          .catch(function(error) {
            console.error(error)
          })
})

app.post('/urls', (request, response) => {
  const url = request.body.url
  const shortened_url = shortid.generate()
  const folder_id = request.body.folder_id
  const id = md5('url_id')
  database('urls').insert({url: url, shortened_url: shortened_url, folder_id: folder_id, counter: 0,  created_at: new Date})
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

app.patch('/urls/:id', (request, response) => {
  const { id } = request.params
  const { counter, folder_id, shortened_url, url } = request.body

  database('urls').where('id', id).first()
  .update({ counter: counter })
  .returning([ 'id', 'folder_id', 'shortened_url', 'url', 'counter'])
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
