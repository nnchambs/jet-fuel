exports.seed = function(knex, Promise) {
  return knex('urls').del()
  .then(() => {
    return Promise.all([
      knex('urls').insert({
        "id": 18,
        "url": "http://www.cutepuppies.com",
        "shortened_url": "shor.ty/SJafwlFDe",
        "folder_id": 2,
        "counter": 0,
        "created_at": "2017-01-27T16:36:37.293Z",
        "updated_at": null
      }),
      knex('urls').insert({
        "id": 6,
        "url": "http://www.tombrady.com",
        "shortened_url": "shor.ty/BJj49udvl",
        "folder_id": 5,
        "counter": 2,
        "created_at": "2017-01-27T07:43:46.658Z",
        "updated_at": null
      }),
      knex('urls').insert({
        "id": 3,
        "url": "http://www.redsox.com",
        "shortened_url": "shor.ty/104ie",
        "folder_id": 3,
        "counter": 1,
        "created_at": "2017-01-27T05:30:45.359Z",
        "updated_at": null
      })
    ]);
  });
};
