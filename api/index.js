const express = require("express");

const wordRoutes = require("./routes/wordRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const wordPrefix = "/api/v1/words";
const scorePrefix = "/api/v1/scores";
const port = 5000;

const app = express();

app.use(express.json());

app.use(wordPrefix, wordRoutes);
app.use(scorePrefix, scoreRoutes);

app.listen(port, (err) => {
  if (err) {
    console.log("Server could not be started: ", err)
    return
  }
  console.log(`Listening on port ${port}`)
});