exports.seed = function(knex, Promise) {
  return knex('folders').del()
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        name: 'Cool Sites',
      }),
      knex('folders').insert({
        name: 'Ball Sports',
      }),
      knex('folders').insert({
        name: 'Karate Tutorials',
      })
    ]);
  });
};
