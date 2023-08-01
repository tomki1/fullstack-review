const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  return axios({
    method: 'get',
    url: options.url,
    headers: options.headers,
    responseType: 'json'
  })
    .then(response => response.data)
    // console.log(response.data[0])
    .catch(error => console.log('Error', error.message));


}

module.exports.getReposByUsername = getReposByUsername;
