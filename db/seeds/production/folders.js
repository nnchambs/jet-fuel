exports.seed = function(knex, Promise) {
  return knex('folders').del()
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        id: 2,
        name: 'Cool Sites'
      }),
      knex('folders').insert({
        id: 5,
        name: 'Ball Sports'
      }),
      knex('folders').insert({
        id: 3,
        name: 'Karate Tutorials'
      })
    ]);
  });
};
