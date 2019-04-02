import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
  constructor(props){
    super(props);
    this.state = {
      clientID: 'bf1dda30eff7f01861fb',
      clientSecret: '1769c103afd4df2be479aded2dee00b083d329b8',
      count: 5,
      sort: 'created: asc',
      repos: []
    }
  }

  componentDidMount(){
    const { username } = this.props ;

    const { count, sort, clientID, clientSecret } = this.state;

    fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id${clientID}&client_secret=${clientSecret}`)
      .then(res => res.json())
      .then(data => {
        this.setState({repos: data})
      })
      .catch(error => console.log(error));
  }
  render() {

    const { repos } = this.state;

    const repoItems = repos.map(repo => (
      <div className="card-details mb-2" key={repo.id}>
        <h5><Link to={repo.html_url} className="text-info mr-2" target="_blank">{repo.name}</Link>
          <span className="badge badge-info mr-1">Stars: {repo.stargazers_count}</span>
          <span className="badge badge-secondary mr-1">Watchers: {repo.watchers_count}</span>
          <span className="badge badge-success mr-1">Forks: {repo.forks_count}</span>
        </h5>
        {repo.description ? (<p>{repo.description}</p>) : null}
        <hr/>
      </div>

    ))

    return (
      <div className="profile-github col-md-12">
        <h5 className="mb-4 mt-4">Latest Github Repos</h5>
        {repoItems}
      </div>
    )
  }
}
ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
}

export default ProfileGithub;