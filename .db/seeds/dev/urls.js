exports.seed = function(knex, Promise) {
  return knex('urls').del()
  .then(() => {
    return Promise.all([
      knex('urls').insert({
        id: 820922,
        url: "http://www.espn.com",
        shortened_url: "shor.ty/389dl",
        folder_id: 2,
        counter: 0,
        created_at: new Date
      }),
      knex('urls').insert({
        id: 385003,
        url: "http://www.google.com",
        shortened_url: "shor.ty/3847e",
        folder_id: 1,
        counter: 0,
        created_at: new Date
      }),
      knex('urls').insert({
        id: 485793,
        url: "http://www.redsox.com",
        shortened_url: "shor.ty/104ie",
        folder_id: 3,
        counter: 0,
        created_at: new Date
      })
    ]);
  });
};
