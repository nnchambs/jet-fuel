exports.seed = function(knex, Promise) {
  return knex('options').del()
  .then(() => {
    return Promise.all([
      knex('options').insert({
        id: 820922,
        option: "Option 1",
        poll_id: 3,
        counter: 0,
        created_at: new Date
      }),
      knex('options').insert({
        id: 385003,
        option: "Option 2",
        poll_id: 3,
        counter: 0,
        created_at: new Date
      }),
      knex('options').insert({
        id: 485793,
        option: "Option 3",
        poll_id: 3,
        counter: 0,
        created_at: new Date
      })
    ]);
  });
};
