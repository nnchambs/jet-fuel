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

function getPolls() {
  $.get('/polls', function(polls){
    polls.forEach(function(poll){
      $('.poll-list').append(
        `<div class="poll-container">
        <div class="poll-name-container">
        <div class="poll-name inline" >${poll.name}</div>
        </div>
        <div class="poll-buttons">
        <button class="inline poll-sort" onClick='getPop(${poll.id})'>Most Popular Links</button>
        <button class="inline poll-sort" onClick='getNewest(${poll.id})'>Newest Link</button>
        </div>
        </div>
        <div class="poll" id=${poll.id}></div>
        <br/>
        `
      )
    })
  })
}
