const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const db = mongoose.connection;
// determine whether there is a db connection error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to mongoDB fetcher database");
});

let repoSchema = mongoose.Schema({
  repo_id: {type: Number, unique: true},
  repo_name: String,
  repo_url: String,
  user_id: Number,
  username: String,
  stargazers_count: Number
});

// let userSchema = mongoose.Schema({
//   user_id: {type: Number, unique: true},
//   username: String,
//   repos: [{type: Schema.Types.ObjectId, ref: 'Repo'}]
// })

let Repo = mongoose.model('Repo', repoSchema);
// let User = mongoose.model('User', userSchema);

let save = (error, result) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  if (error) {
    console.log(error);
  } else {
    console.log(result);
  }


}

module.exports.save = save;
module.exports.db = db;
module.exports.Repo = Repo;