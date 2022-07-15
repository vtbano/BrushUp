const { Pool } = require("pg");
const {
  user,
  host,
  database,
  password,
  port,
} = require("../secrets/db_configuration");

// const pool = new Pool({ user, host, database, password, port });
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

module.exports = pool;
