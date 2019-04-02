import React, { Component } from 'react'
import CommonProfileBg from '../common/CommonProfileBg';
import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="profile-header">
        <CommonProfileBg />
        <div className="text-center">
          <div className="avatar">
            <img src={profile.user.avatar} alt={profile.user.name}/>

          </div>

            {isEmpty(profile.website) ? 
              null : <a href={profile.website} rel="noopener noreferrer" className="text-dark p-2" target="_blank"><i className="fas fa-globe fa-2x"></i></a>
            }
            {isEmpty(profile.social && profile.social.twitter) ? 
              null : <a href={profile.social.twitter} rel="noopener noreferrer" className="text-dark p-2" target="_blank"><i className="fab fa-twitter fa-2x"></i></a>
            }
            
            {isEmpty(profile.social && profile.social.facebook) ? 
              null : <a href={profile.social.facebook} rel="noopener noreferrer" className="text-dark p-2" target="_blank"><i className="fab fa-facebook fa-2x"></i></a>
            }
            
            {isEmpty(profile.social && profile.social.linkedin) ? 
              null : <a href={profile.social.linkedin} rel="noopener noreferrer" className="text-dark p-2" target="_blank"><i className="fab fa-linkedin fa-2x"></i></a>
            }

            {isEmpty(profile.social && profile.social.youtube) ? 
              null : <a href={profile.social.youtube} rel="noopener noreferrer" className="text-dark p-2" target="_blank"><i className="fab fa-youtube fa-2x"></i></a>
            }

            {isEmpty(profile.social && profile.social.instagram) ? 
              null : <a href={profile.social.instagram} rel="noopener noreferrer" className="text-dark p-2" target="_blank"><i className="fab fa-instagram fa-2x"></i></a>
            }

          <h4 className="card-title">{profile.user.name}</h4>
          <p className="card-text">
            {profile.status}{' '}
            {isEmpty(profile.company) ? null : <span>at {profile.company}</span>}
          </p>
        </div>
      </div>
    )
  }
}


export default ProfileHeader;