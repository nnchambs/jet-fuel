
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('folders', function(table) {
      table.increments('id').primary();
      table.string('name');
    }),

    knex.schema.createTable('urls', function(table) {
      table.increments('id').primary();
      table.string('url');
      table.string('shortened_url');
      table.integer('folder_id')
        .references('id')
        .inTable('folders')

      table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('folders'),
    knex.schema.dropTable('urls')
  ])
};
