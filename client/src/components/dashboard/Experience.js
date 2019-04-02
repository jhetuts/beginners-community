import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';


class Experience extends Component {

	onDeleteClick(expID){
		this.props.deleteExperience(expID);
	}

  render() {
		const experience = this.props.experience.map(exp => (
			<tr key={exp._id}>
				<td className="align-middle">{exp.company}</td>
				<td className="align-middle">{exp.title}</td>
				<td className="align-middle">
					<Moment format="YYYY/MM">{exp.from}</Moment> - {exp.to === null ? ('Present') : <Moment format="YYYY/MM">{exp.to}</Moment>}
					</td>
				<td className="align-middle text-center">
					<button onClick={this.onDeleteClick.bind(this, exp._id)} className="btn btn-light"><i className="fa fa-times-circle"></i></button>
					</td>
			</tr>
		));
		
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
				<table className="table table-striped table-hover">
					<thead className="thead-dark">
						<tr>
							<th>Company</th>
							<th>Title</th>
							<th colSpan="2">Years</th>
						</tr>
					</thead>
					<tbody>
						{experience}
					</tbody>
				</table>
      </div>
    )
  }
}

Experience.propTypes = {
	deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
