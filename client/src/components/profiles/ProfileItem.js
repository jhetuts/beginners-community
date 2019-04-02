import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
		<div className="profile">
			<div className="card mb-4">
				<div className="card-header text-center">
					<img src={profile.user.avatar} alt={profile.user.name} className="profile-image"/>
				</div>
				<div className="card-body pt-4 ">
					<h5 className="card-title text-center">{profile.user.name}</h5>
					<p className="text-center">
							{profile.status} {isEmpty(profile.company) ? null : (<span> at {profile.company}</span>)}
					</p>
					<p className="text-center">
						{isEmpty(profile.location) ? null: (<span>{profile.location}</span>)}
					</p>
					
					<h6>Skill Set</h6>
					<div className="pt-2 pb-2">
						{profile.skills.map((skill, index) => (
								<span className="badge badge-secondary badge-info p-2 mr-1 mb-1 display-4 d-inline-block" key={index}>{skill}</span>
						))}
					</div>
					<Link className="btn btn-info d-block" to={`/profile/${profile.handle}`}>View Profile</Link>
				</div>
			</div>
		</div>
    )
  }
}

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired
}

export default ProfileItem;