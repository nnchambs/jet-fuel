
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('polls', function(table) {
      table.increments('id').primary();
      table.string('name');
    }),

    knex.schema.createTableIfNotExists('options', function(table) {
      table.increments('id').primary()
      table.string('option')
      table.integer('folder_id')
        .references('id')
        .inTable('polls')
      table.integer('counter')
      table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('options'),
    knex.schema.dropTableIfExists('polls')
  ])
};
