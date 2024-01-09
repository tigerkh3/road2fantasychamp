// create new folders for each component
// create new file in each component folder
// export the model from the file
const db = require("../config/index.js")

// database query here in the form of insert
let addPlayer = (data, callback) => {
  db.query(`INSERT into watchlist (player_data) VALUES ('${data.playerName}')`, (err, res) => {
    if (err) {
      console.log('watchlist insertion error', err)
      callback(null, err)
    } else {
      callback('success')
    }
  })

}

let watchlist = (request, callback) => {
  db.query('SELECT * FROM watchlist', (err, res) => {
    if (err) {
      console.log('watchlist render error', err)
    } else {
      callback(res.rows, null)
    }
  })
}


module.exports.addPlayer = addPlayer;
module.exports.watchlist = watchlist;