import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }
  
  render() {
    return (
        <div className="landing">
          <div className="dark-wrap">
            <div className="container form-landing-wrap">
              <div className="row">
                <div className="col-md-12 text-center text-light">
                  <h1 className="display-3 mb-4">BgnnrsCmmnty</h1>
                  <p className="lead">Branch for new leaf programmers. Be part of the community!</p>
                  <hr />
                  <Link to="/register" className="btn btn-md btn-info mr-2">Sign Up</Link>
                  <Link to="/login" className="btn btn-md btn-light">Login</Link>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth 
})
export default connect(mapStateToProps)(Landing);