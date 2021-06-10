const sqlite3 = require("sqlite3")
const path = require("path")

const db = new sqlite3.Database(path.join(__dirname, "../hangman-database.db"));

const getWords = (req, res) => {
  let query = /*sql*/ `SELECT * FROM words`
  db.get(query, [], (err, results) => {
    res.json(results);
  });
}

const createNewWord = (req, res) => {
  const query = /*sql*/ `INSERT INTO words(word) VALUES($word)`;
  const params = { $word: req.body.word }
  db.run(query, params, () => {
    res.json({ message: "Word added successfully", params })
  })
}

module.exports = { getWords, createNewWord }