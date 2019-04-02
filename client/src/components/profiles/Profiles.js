import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getProfiles } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';
import ProfileItem from './ProfileItem';

class Profiles extends Component {

	componentDidMount(){
		this.props.getProfiles();
	}

  render() {
		const { profiles, loading } = this.props.profile;
		let profileItems;

		if(isEmpty(profiles) || loading){
			profileItems = <Spinner />;
		} else {
			if(profiles.length > 0){
				const profile = profiles.map(profile => (
					<ProfileItem key={profile._id} profile={profile}/>
				))
				profileItems = (
					<div className="card-columns">{profile}</div>
				);
			} else {
				profileItems = <h4>No profiles found...</h4>
			}
		}
    return (
      <div className="profiles">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4 text-center">Community</h1>
							<p className="lead text-center">Browse and connect with developers</p>
							{profileItems}
						</div>
					</div>
				</div>
      </div>
    )
  }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);