import React, { Component } from 'react'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { deleteEducation } from '../../actions/profileActions';


class Education extends Component {
  onDeleteClick(educID){
		this.props.deleteEducation(educID);

	}
  render() {
    const education = this.props.education.map(edu => (
        <tr key={edu._id}>
            <td className="align-middle">{edu.school}</td>
            <td className="align-middle">{edu.degree}</td>
            <td className="align-middle">
                <Moment format="YYYY/MM">{edu.from}</Moment> - {' '}
                {edu.to === null ? "Current" : <Moment format="YYYY/MM">{edu.to}</Moment>}</td>
            <td className="align-middle text-center"><button className="btn btn-light" onClick={this.onDeleteClick.bind(this, edu._id)}><i className="fa fa-times-circle"></i></button></td>
        </tr>
    ));
    
    return (
      <div>
        <h4 className="mb-4">Educational Attainment</h4>
        <table className="table table-striped table-hover">
            <thead className="thead-dark">
                <tr>
									<th>School</th>
									<th>Degree</th>
									<th>Years</th>
									<th></th>
								</tr>
            </thead>
            <tbody>
                {education}
            </tbody>
        </table>
      </div>
    )
  }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
};


export default connect(null, { deleteEducation })(Education);