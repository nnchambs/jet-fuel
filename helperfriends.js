const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

module.exports = {

  postNewFolder: function(folder, response) {
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
  },

  getFolders: function(response) {
    database('folders').select()
      .then(function(folders){
        response.status(200).json(folders)
      })
      .catch(function(error) {
        console.log('Nah')
      })
  },

  getUrls: function(response) {
    database('urls').select()
      .then(function(urls){
        response.status(200).json(urls)
      })
      .catch(function(error) {
        console.log('Nah')
      })
  },

  deleteUrl: function (id, response) {
    database('urls').where('id', id).first().del()
    .then(function() {
      database('urls').select()
        .then(function() {
          response.status(200).json('URL deleted')
        })
    })
  },

  postNewUrl: function(url, shortened_url, folder_id, id, response) {
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
   },

  sortUrls: function(folder_id, sort_param, sort_by, response) {
    database('urls').select().where('folder_id', folder_id).orderBy(sort_param, sort_by)
      .then(function(urls){
        response.status(200).json(urls)
      })
      .catch(function(error) {
        console.error('Nah')
      })
  },

  increaseCounter: function(id, counter, response) {
      database('urls').where('id', id).first()
      .update({ counter: counter })
      .returning([ 'id', 'folder_id', 'shortened_url', 'url', 'counter'])
      .then(function() {
        database('urls').select()
          .then(function(url) {
           response.status(200).json(url)
          })
         .catch(function(error) {
           console.error('Nah')
         });
      })
  },

  getUrlsById: function(id, response) {
    database('folders').select().table('urls').where('id', id)
      .then(function(urls) {
        response.status(200).json(urls);
      })
      .catch(function(error) {
        console.error(error)
      })
  }
}
