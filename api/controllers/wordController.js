const sqlite3 = require("sqlite3")
const path = require("path")

const db = new sqlite3.Database(path.join(__dirname, "../hangman-database.db"));

const getWordById = (req, res) => {
  let query = /*sql*/ `SELECT * FROM words WHERE id = $wordId`
  let params = { $wordId: req.params.wordId };
  db.get(query, params, (err, result) => {
    res.json(result.word);
  });
}

const createNewWord = (req, res) => {
  const query = /*sql*/ `INSERT INTO words(word) VALUES($word)`;
  const params = { $word: req.body.word }
  db.run(query, params, () => {
    res.json({ message: "Word added successfully", params })
  })
}

module.exports = { getWordById, createNewWord }