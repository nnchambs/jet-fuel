const socket = io();

const connectionCount = document.getElementById('connection-count');

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
