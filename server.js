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
const socketIo = require('socket.io');
const port = process.env.PORT || 3000;

const server = http.createServer(app)
                 .listen(port, () => {
                    console.log(`Listening to port ${port}.`);
                  });

const io = socketIo(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.title = 'Poehlster'

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/public/creation.html')
})

app.get('/poll', (req, res) => {
  res.sendFile(__dirname + '/public/poll.html');
});

app.get('/polls', (request, response) => {
  helpers.getPolls(response)
})

app.post('/polls', (request, response) => {
  const poll = request.body.poll
  const opt_one = request.body.opt_one
  const opt_two = request.body.opt_two
  const opt_three = request.body.opt_three
  const opt_four = request.body.opt_four
  helpers.postNewPoll(poll, opt_one, opt_two, opt_three, opt_four, response);
})

io.on('connection', (socket) => {
  console.log('A user has connected.', io.engine.clientsCount);
});

module.exports = server
