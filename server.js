const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const md5 = require('md5');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Shor.ty'

app.get('/', (request, response) => {
  response.send('Hello world')
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is runing on ${app.get('port')}.`)
})
