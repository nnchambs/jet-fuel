var pollId = window.location.href.match(/[^\/]*$/)[0]

const socket = io();
const connectionCount = document.getElementById('connection-count');

$.get(`/polls/${pollId}`, function(poll){
  poll.forEach(poll => {
    $('.poll-name').text(poll.name)
    $('.opt-one-text').text(poll.opt_one)
    $('.opt-two-text').text(poll.opt_two)
    $('.opt-three-text').text(poll.opt_three)
    $('.opt-four-text').text(poll.opt_four)
  })
})

function getPollById(id, response) {
  database('polls').select().table('polls').where('id', id)
    .then(function(poll) {
      response.status(200).json(poll);
    })
    .catch(function(error) {
      console.error(error)
    })
}

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
