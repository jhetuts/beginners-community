import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner'
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';
import isEmpty from '../../validation/is-empty';

class Dashboard extends Component {
  componentDidMount(){
    this.props.getCurrentProfile();
  }

  onDeleteClick(e){
    this.props.deleteAccount();
  }
  
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashBoardContent;

    if(profile === null || loading){
      dashBoardContent = <Spinner/>
    } else {
      if(Object.keys(profile).length > 0){
        dashBoardContent = (
          <div>
            <p className="lead text-muted">Welcome{' '}
              <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            {!isEmpty(profile.experience) ? <Experience experience={profile.experience}/> : '' }
            {!isEmpty(profile.education) ? <Education education={profile.education}/> : '' }
            <div style={{marginTop: '60px'}}>
            <Link className="btn btn-info" to={`/profile/${profile.handle}`}>View Profile</Link>{' '}
              <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Account</button>
            </div>
          </div>
        );
      } else {
        dashBoardContent = (
            <div>
              <p className="lead text-muted">Welcome {user.name}</p>
              <p>Set up your profile now</p>
              <Link to="/create-profile" className="btn btn-md btn-primary">Create Profile</Link>
            </div>
          );
      }
    }
    
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashBoardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);