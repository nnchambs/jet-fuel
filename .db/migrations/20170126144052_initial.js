
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('folders', function(table) {
      table.increments('id').primary();
      table.string('name');
    }),

    knex.schema.createTableIfNotExists('urls', function(table) {
      table.increments('id').primary()
      table.string('url')
      table.string('shortened_url')
      table.integer('folder_id')
        .references('id')
        .inTable('folders')
      table.integer('counter')
      table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('urls'),
    knex.schema.dropTableIfExists('folders')
  ])
};
