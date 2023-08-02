const express = require('express');
let app = express();
const path = require('path');
const db = require('../database/index.js');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
var github = require('../helpers/github.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.

var location = path.join(__dirname, '../client/dist');

app.use(express.static(location));


app.post('/repos', function (req, res) {
  console.log("username from client search", req.body.username);


  // do api get request with username
  github.getReposByUsername(req.body.username)
  .then(repos => {
    // loop through the repos, create a document of each repo
    for (var i = 0; i < repos.length; i++) {
      const repo = new db.Repo({
        repo_id: repos[i].id,
        repo_name: repos[i].name,
        repo_url: repos[i].html_url,
        user_id: repos[i].owner.id,
        username: repos[i].owner.login,
        stargazers_count: repos[i].stargazers_count
      });
      // save the document to mongoDB fetcher database
      repo.save()
      .catch( err => {
        // if the document is not unique, then it is already in our fetcher DB
        // update its information
        const filter = { repo_id: repo.repo_id };
        const update = { $set:{repo_name: repo.repo_name, repo_url: repo.repo_url, user_id: repo.user_id, username: repo.username, stargazers_count: repo.stargazers_count }};
        db.Repo.findOneAndUpdate(filter, update, {new: true}, (err, doc) => {
          if (err) {
              console.log("error with updating");
          }
        });


      })
      .then(() => res.status(201).send())
        }
  })
});


app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // sort stargazers count in descending order and limit to 25 documents
  db.Repo.find({}).sort({stargazers_count: -1}).limit(25).exec(function(err, docs) {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  });

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

