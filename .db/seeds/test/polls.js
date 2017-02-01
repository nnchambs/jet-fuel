exports.seed = function(knex, Promise) {
  return knex('polls').del()
  .then(() => {
    return Promise.all([
      knex('polls').insert({
        id: 3,
        name: 'Cool Sites'
      })
    ]);
  });
};
