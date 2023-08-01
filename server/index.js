const express = require('express');
let app = express();
var path = require('path');
const db = require('../database/index.js');
const Promise = require('bluebird');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.

var location = path.join(__dirname, '../client/dist');

app.use(express.static(location));


app.post('/repos', async function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const repo = new db.Repo({
    repo_id: 43245343,
    repo_name: 'fullstack-review',
    repo_url: 'www.github.com/fs',
    user_id: 335545,
    username: 'coolname',
    stargazers_count: 3
  });
  console.log("in post")
  try {
    repo.save() // test with hardcoded
    .then( item => {
      console.log(item);
      res.send("saved to db");
      }
    )
    .catch( err => {
      res.status(400).send("unable to save to db");
    });

  } catch(error) {
    res.status(500).json({error: e.message});;

  }
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  res.send(repo);
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

