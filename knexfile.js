// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/polls',
    migrations: {
      directory: '.db/migrations'
    },
    seeds: {
      directory: '.db/seeds/dev'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection:'postgres://localhost/polls_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: '.db/seeds/test'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'postgresql',
    connection:
    process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: '.db/migrations'
    }
  },
  seeds: {
    directory: '.db/seeds/production'
  },
  useNullAsDefault: true
};
