const sqlite3 = require("sqlite3")
const path = require("path")

const db = new sqlite3.Database(path.join(__dirname, "../hangman-database.db"));

const getAllScores = (req, res) => {
  let query = /*sql*/ `SELECT * FROM scores ORDER BY timestamp DESC LIMIT 10`;
  db.all(query, [], (err, scores) => {
    scores.length > 0 ? res.json(scores) : res.json({ message: "No scores yet!" })
  })
}

const postScore = (req, res) => {
  req.body.timestamp = Date.now()

  const query = /*sql*/ `INSERT INTO scores(username, last_game_score, timestamp) VALUES($username, $lastGameScore, $timestamp)`
  let params = {};
  for (let key in req.body) {
    params["$" + key] = req.body[key];
  }
  db.run(query, params, () => {
    res.json({ message: "Score added successfully", params })
  })
}


module.exports = { getAllScores, postScore }