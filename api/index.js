const express = require("express");
const port = 5000;

const app = express();

app.use(express.json());

app.listen(port, (err) => {
  if(err){
    console.log("Server could not be started: ", err)
    return
  }
  console.log(`Listening on port ${port}`)
})