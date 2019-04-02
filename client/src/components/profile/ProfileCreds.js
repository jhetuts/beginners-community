import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';
import Moment from 'react-moment';

class ProfileCreds extends Component {
  render() {
    const { education, experience } = this.props;

    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item p-0">
        <h4>{exp.company}</h4>
        <h5>{exp.title}</h5>
        <p>
          <Moment format="YYYY/MMM">{exp.from}</Moment> - {' '} 
          { exp.to === null ? (" Present") :  (<Moment format="YYYY/MMM">{exp.to}</Moment>) }
        </p>
        <p>
          {exp.location === '' ? null : (<span><strong>Location: </strong>{exp.location}</span>)}
        </p>
        <p>
          {exp.description === '' ? null : (<span><strong>Description: </strong>{exp.description}</span>)}
        </p>
      </li>
    ));

    const eduItems = education.map(edu => (
      <li key={edu._id} className="list-group-item p-0">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY/MMM">{edu.from}</Moment> - {' '}
          { edu.to === null ? (" Present") :  (<Moment format="YYYY/MMM">{edu.to}</Moment>) }
        </p>
        <p><strong>Degree: </strong>{edu.degree}</p>
        <p><strong>Field of Study: </strong>{edu.fieldofstudy}</p>
      </li>
    ));

    return (
      <div className="profile-creds col-md-12">
        <div id="accordion">
          {isEmpty(experience) ? null : (
            <div className="card">
              <div className="card-header p-1" id="headingOne">
                <h5 className="mb-0">
                  <button className="btn btn-default btn-block text-left" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Experience/s:
                  </button>
                </h5>
              </div>
          
              <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                <div className="card-body p-2 pl-3 pr-3">
                  <ul className="list-group list-group-flush">
                    {expItems}
                  </ul>
                </div>
              </div>
            </div>
          )}
          {isEmpty(education) ? null : (
            <div className="card">
              <div className="card-header p-1" id="headingTwo">
                <h5 className="mb-0">
                  <button className="btn btn-default btn-block text-left" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Education/s:
                  </button>
                </h5>
              </div>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                <div className="card-body p-2 pl-3 pr-3">
                <ul className="list-group list-group-flush">
                    {eduItems}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

ProfileCreds.propTypes = {
  experience: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired
}

export default ProfileCreds;