import React from 'react';
import RepoEntry from './RepoEntry.jsx';


const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    {repos.map((repo, index) =>
          <RepoEntry repo={repo} key={index} index={index}/>
    )}

  </div>
)

export default RepoList;