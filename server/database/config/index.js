// database configuration
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../../../.env')});

const Pool = require('pg').Pool
// const pool = new Pool({
//   database: process.env.DATABASE,
//   user: process.env.USER,
//   host: process.env.HOST,
//   password: "",
//   port: process.env.DB_PORT,

// })

let DB_HOST = process.env.HOST;
let DB_USER = process.env.USER;
let DB_NAME = process.env.DATABASE;

let dbString = process.env.DB_URL
// let dbString = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:35000/${DB_NAME}`;
let pool = new Pool({ connectionString: dbString });

console.log(dbString);

module.exports = pool;

