exports.seed = function(knex, Promise) {
  return knex('options').del()
  .then(() => {
    return Promise.all([
      knex('options').insert({
        "id": 18,
        "option": "option 1",
        "poll_id": 3,
        "counter": 0,
        "created_at": "2017-01-27T16:36:37.293Z",
        "updated_at": null
      }),
      knex('options').insert({
        "id": 6,
        "option": "option 2",
        "poll_id": 3,
        "counter": 2,
        "created_at": "2017-01-27T07:43:46.658Z",
        "updated_at": null
      }),
      knex('options').insert({
        "id": 3,
        "option": "option 3",
        "poll_id": 3,
        "counter": 1,
        "created_at": "2017-01-27T05:30:45.359Z",
        "updated_at": null
      }),
      knex('options').insert({
        "id": 5,
        "option": "option 4",
        "poll_id": 3,
        "counter": 1,
        "created_at": "2017-01-27T05:30:45.359Z",
        "updated_at": null
      })
    ]);
  });
};
