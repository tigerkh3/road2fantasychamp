// create script here for watchlist in database
// import db connection
const db = require("../config/index.js");

db.query('CREATE TABLE watchlist (id SERIAL, player_name TEXT, player_id TEXT, PRIMARY KEY(id))', (err, res) => {
  if (err) {
    console.log('failed to create table', err)
  } else {
    console.log('table created successfully')
    db.end();
  }
})