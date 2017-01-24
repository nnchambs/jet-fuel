const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const md5 = require('md5');
const path = require('path')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.Port || 3000)
app.locals.title = 'Shor.ty'
app.locals.folders = {

}

app.use('/', express.static(__dirname + '/public'))

// app.get('/', (request, response) => {
//   response.sendFile(path.join(__dirname + '/index.html'));
//   // response.send("hello world")
// })

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is runnning on ${app.get('port')}`)
})
