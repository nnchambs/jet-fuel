exports.seed = function(knex, Promise) {
  return knex('options').del()
  .then(() => {
    return Promise.all([
      knex('options').insert({
        id: 1,
        option: "option 1",
        poll_id: 3
      }),
      knex('options').insert({
        id: 2,
        option: "option 2",
        poll_id: 3
      }),
      knex('options').insert({
        id: 3,
        option: "option 3",
        poll_id: 3
      }),
      knex('options').insert({
        id: 4,
        option: "option 4",
        poll_id: 3
      })
    ]);
  });
};
