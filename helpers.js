const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

module.exports = {

  postNewPoll: function(poll, opt_one, opt_two, opt_three, opt_four, response) {
    database('polls').insert({name: poll, opt_one: opt_one, opt_two: opt_two, opt_three: opt_three, opt_four: opt_four })
    .then(function() {
      database('polls').select()
        .then(function(polls) {
          response.status(200).json(polls)
        })
        .catch(function(error) {
          console.error('Sorry, unable to save new poll.')
        });
    })
  },

  getPolls: function(response) {
    database('polls').select()
      .then(function(polls){
        response.status(200).json(polls)
      })
      .catch(function(error) {
        console.log('Sorry, unable to retrieve polls')
      })
  },

  getOptions: function(response) {
    database('options').select()
      .then(function(options){
        response.status(200).json(options)
      })
      .catch(function(error) {
        console.log('Sorry, unable to get answer options.')
      })
  },

  // deleteUrl: function (id, response) {
  //   database('urls').where('id', id).first().del()
  //   .then(function() {
  //     database('urls').select()
  //       .then(function(url) {
  //         response.status(200).json(url)
  //       })
  //   })
  // },

  postNewOption: function(option, poll_id, id, response) {
    database('options').insert({option: option, poll_id: poll_id})
     .then(function() {
       database('options').select()
         .then(function(option) {
           response.status(200).json(option)
         })
         .catch(function(error) {
           console.error('Sorry, unable to post new option.')
         });
     })
   },

  // sortOptions: function(poll_id, sort_param, sort_by, response) {
  //   database('urls').select().where('folder_id', folder_id).orderBy(sort_param, sort_by)
  //     .then(function(urls){
  //       response.status(200).json(urls)
  //     })
  //     .catch(function(error) {
  //       console.error('Nah')
  //     })
  // },

  increaseCounter: function(id, counter, response) {
      database('options').where('id', id).first()
      .update({ counter: counter })
      .returning([ 'id', 'poll_id', 'option', 'counter'])
      .then(function() {
        database('options').select()
          .then(function(option) {
           response.status(200).json(option)
          })
         .catch(function(error) {
           console.error('Nah')
         });
      })
  },

  getOptionsById: function(id, response) {
    database('polls').select().table('options').where('id', id)
      .then(function(options) {
        response.status(200).json(options);
      })
      .catch(function(error) {
        console.error('Sorry, unable to get options by that ID')
      })
  }
}
