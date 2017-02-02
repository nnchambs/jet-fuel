const socket = io();
const helpers = require('../helpers.js')


const connectionCount = document.getElementById('connection-count');

$.get('polls/:id', (request, response) {
  const { id } = request.params
  helpers.getPollById(id, response)
  .then(console.log(response);)
})

socket.on('usersConnected', (count) => {
  connectionCount.innerText = 'Connected Users: ' + count;
});

const statusMessage = document.getElementById('status-message');

socket.on('statusMessage', (message) => {
  statusMessage.innerText = message;
});

const buttons = document.querySelectorAll('#choices button');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    socket.send('voteCast', this.innerText);
  });
}

socket.on('voteCount', (votes) => {
  console.log(votes);
});
