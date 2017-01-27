const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

module.exports.postNewFolder = function(folder, response) {
  database('folders').insert({name: folder})
  .then(function() {
    database('folders').select()
      .then(function(folders) {
        response.status(200).json(folders)
      })
      .catch(function(error) {
        console.error('Nah')
      });
  })
}

module.exports.getFolders = function(response) {
  database('folders').select()
    .then(function(folders){
      response.status(200).json(folders)
    })
    .catch(function(error) {
      console.log('Nah')
    })
}

module.exports.getUrls = function(response) {
  database('urls').select()
    .then(function(urls){
      response.status(200).json(urls)
    })
    .catch(function(error) {
      console.log('Nah')
    })
}

module.exports.postNewUrl = function(url, shortened_url, folder_id, id, response){
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
}
