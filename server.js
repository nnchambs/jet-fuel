const express = require('express');
const http = require("http");
const app = express();
const bodyParser = require('body-parser');
const md5 = require('md5');
const path = require('path');
const shortid = require('shortid');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const knex = require('knex')(configuration);
const helpers = require('./helpers.js')
const fs = require('fs')

const server = http.createServer()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Poehlster'

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (request, response) => {
  res.sendfile(__dirname + '/public/index.html')
})

app.get('/polls', (request, response) => {
  helpers.getPolls(response)
})

app.post('/polls', (request, response) => {
  const poll = request.body.pollname
  helpers.postNewPoll(poll, response);
})

app.get('/options', (request, response) => {
  helpers.getOptions(response)
})

// app.get('/options/:id', (request, response) => {
//   const { id } = request.params
//   helpers.getOptionsById(id, response)
// })

// app.get('/options/:id/:sortby/:sortparam', (request, response) => {
//   const poll_id = request.params.id
//   const sort_by = request.params.sortby
//   const sort_param = request.params.sortparam
//   helpers.sortOptions(poll_id, sort_param, sort_by, response)
// })

app.post('/options', (request, response) => {
  const option = request.body.option
  const poll_id = request.body.poll_id
  const id = md5('poll_id')
  helpers.postNewOption(option, poll_id, id, response)
})

// app.patch('/options/:id', (request, response) => {
//   const { id } = request.params
//   const { counter, folder_id, shortened_url, url } = request.body
//   helpers.increaseCounter(id, counter, response)
// })

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is runnning on ${app.get('port')}`)
})

// app.delete('/urls/:id', (request, response) => {
//   const { id } = request.params
//   helpers.deleteUrl(id, response)
// })
