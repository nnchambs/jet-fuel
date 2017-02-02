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
require('dotenv').config()
const port = process.env.PORT || 3000;

const server = http.createServer(app)
                 .listen(port, () => {
                    console.log(`Listening to port ${port}.`);
                  });

const io = socketIo(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.title = 'Poehler'

app.use(express.static(path.join(__dirname, '/public')))

app.use('/form', (request, response) => {
  response.sendFile(__dirname + '/public/creation.html')
})

app.use('/poll', (req, res) => {
  res.sendFile(__dirname + '/public/poll.html');
});

app.get('/polls', (request, response) => {
  helpers.getPolls(response)
})

app.get('/polls/:id', (request, response) => {
  const { id } = request.params
  helpers.getPollById(id, response)
})

app.get('/authkeys', (req, res) => {
  authId = process.env.AUTH0_CLIENT_ID
  authDomain = process.env.AUTH0_DOMAIN
  res.status(200).json({authId, authDomain})
})

app.post('/polls', (request, response) => {
  const poll = request.body.poll
  const opt_one = request.body.opt_one
  const opt_two = request.body.opt_two
  const opt_three = request.body.opt_three
  const opt_four = request.body.opt_four
  const url = shortid.generate()
  helpers.postNewPoll(poll, opt_one, opt_two, opt_three, opt_four, url, response);
})

//sockets codes
const votes = {};

const countVotes = (votes) => {
  const voteCount = {
      1: 0,
      2: 0,
      3: 0,
      4: 0
  };

  for (let vote in votes) {
    voteCount[votes[vote]]++
  }

  return voteCount;
}

io.on('connection', (socket) => {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.emit('statusMessage', 'You have connected.');

  socket.on('disconnect', () => {
    console.log('A user has disconnected.', io.engine.clientsCount);
    delete votes[socket.id];
    socket.emit('voteCount', countVotes(votes));
    io.sockets.emit('userConnection', io.engine.clientsCount);
  });

  socket.on('message', (channel, message) => {
    if (channel === 'voteCast') {
      votes[socket.id] = message;
      socket.emit('voteCount', countVotes(votes));
    }
  });
});

module.exports = server
