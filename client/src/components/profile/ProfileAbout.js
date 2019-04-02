import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';


class ProfileAbout extends Component {
  render() {

    const { profile } = this.props;

    const skills = profile.skills.map((skill, index) => (
      <div className="d-inline-block mr-2" key={index}>
        <span className="badge badge-primary p-2 display-4 mb-2">{skill}</span>
      </div>
    ));

    return (
      <div className="profile-about col-md-12">
        <hr/>
        <div id="accordion">
          <div className="row">
            {isEmpty(profile.skills) ? '' : (
              <div className="skills col-md-6">
                <h5>Skills Set</h5>
                {skills}
              </div>
            )}
            {isEmpty(profile.bio) ? '' : (
              <div className="bio col-md-6">
                <h5>Bio</h5>
                <p>{profile.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileAbout;