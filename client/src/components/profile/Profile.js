import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileGithub from './ProfileGithub';
import ProfileCreds from './ProfileCreds';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {
  componentDidMount(){
    if(this.props.match.params.handle){
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.profile.profile === null && this.props.profile.loading){
      this.props.history.push('/not-found');
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if(profile === null || loading ){
      profileContent = <Spinner />
    } else {
      profileContent = (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Link className="btn btn-light mb-3 float-flex" to="/profiles"><i className="fas fa-angle-double-left"></i> Back to Community</Link>
            </div>
          </div>
          <div className="card">
            <div className="container">
              <div className="row">
                <ProfileHeader profile={profile}/>
                <ProfileAbout profile={profile}/>
                <ProfileCreds experience={profile.experience} education={profile.education}/>
                {profile.githubusername ? (<ProfileGithub username={profile.githubusername}/>) : null }
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="profile">
          <div className="row">
            <div className="col-md-12">
              {profileContent}
            </div>
         </div>
      </div>
    )
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
