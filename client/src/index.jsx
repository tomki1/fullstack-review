import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';
const { useState, useEffect } = React;


const App = () => {

  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // load the data from the server
  var loadData = () => {
    console.log("IN load data")
    axios({
      method: 'get',
      url: '/repos',
      // headers: options.headers,
      responseType: 'json'
    })
      .then((response) => {
        console.log('in response get', response)
        // change state of repos
        setRepos(response.data);
      })
      .catch(error => console.log('Error', error.message))
      .finally(() => {console.log("loaded again");

        setIsLoading(false);});
  }



  useEffect(loadData, []);

  const search = (term) => {
    console.log(`${term} was searched`);
    return axios({
      method: 'post',
      url: '/repos',
      data: {
        username: term
      }
    })
    .then((response) => {
      // console.log("in response", response)
      loadData();

    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      return axios.get('/repos')
    }).then((response) => {
      setRepos(response.data);
    })
  }

  if (isLoading) {
    console.log("loading");
    return null;
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search} loadData={loadData}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));