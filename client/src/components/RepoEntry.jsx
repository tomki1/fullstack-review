import React from 'react';

const RepoEntry = ({ repo }) => {



  return (
  <div>
    <a href={repo.repo_url}>{repo.repo_name}</a>
    <p>starred count: {repo.stargazers_count}</p>
  </div>
  )
}

export default RepoEntry;