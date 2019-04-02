import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import isEmpty from '../../validation/is-empty';

// Actions
import { createProfile, getCurrentProfile } from '../../actions/profileActions';

 class CreateProfile extends Component {
    constructor(){
        super();
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            instagram: '',
            youtube: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    onSubmit(e){
        e.preventDefault();

        const profileData = {
            handle:         this.state.handle,
            company:        this.state.company,
            website:        this.state.website,
            location:       this.state.location,
            status:         this.state.status,
            skills:         this.state.skills,
            githubusername: this.state.githubusername,
            bio:            this.state.bio,
            twitter:        this.state.twitter,
            facebook:       this.state.facebook,
            linkedin:       this.state.linkedin,
            instagram:      this.state.instagram,
            youtube:        this.state.youtube,
        }

        this.props.createProfile(profileData, this.props.history);

    }

    componentDidMount(){
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }

        if(nextProps.profile.profile){
            const profile = nextProps.profile.profile;
            const skillsCSV = profile.skills.join(',');

            // Check if it's empty
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.social.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
            profile.social.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
            profile.social.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
            profile.social.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
            profile.social.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';

            // Set component fields state

            this.setState({
                handle:         profile.handle,
                company:        profile.company,
                website:        profile.website,
                location:       profile.location,
                status:         profile.status,
                skills:         skillsCSV,
                githubusername: profile.githubusername,
                bio:            profile.bio,
                twitter:        profile.twitter,
                facebook:       profile.facebook,
                linkedin:       profile.linkedin,
                instagram:      profile.instagram,
                youtube:        profile.youtube
            });
        }
    }

    render() {
        const { errors, displaySocialInputs } = this.state;

        let socialInputs = '';
        if(displaySocialInputs){
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        erros={errors.twitter}
                        onChange={this.onChange}
                    />
                    <InputGroup
                        placeholder="Facebook Profile URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        erros={errors.facebook}
                        onChange={this.onChange}
                    />
                    <InputGroup
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        erros={errors.linkedin}
                        onChange={this.onChange}
                    />
                    <InputGroup
                        placeholder="Instagram Profile URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        erros={errors.instagram}
                        onChange={this.onChange}
                    />
                    <InputGroup
                        placeholder="Youtube Profile URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        erros={errors.youtube}
                        onChange={this.onChange}
                    />
                </div>
            );
        }

        const options = [
            { label: '* Select Professional Status', value: 0},
            { label: 'Developer', value: 'Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Mid Developer', value: 'Mid Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student or Learning', value: 'Student or Learning' },
            { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Others', value: 'Others' }
        ];

        return (
        <div className="create-profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/dashboard" className="btn btn-light"><i className="fas fa-angle-double-left"></i> Go back</Link>
                        <h1 className="display-4 text-center">Edit Profile</h1>
                        <small className="d-block p-3">* required fields</small>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                placeholder="* Profile Handle"
                                name="handle"
                                value={this.state.handle}
                                onChange={this.onChange}
                                error={errors.handle}
                                info="A unique handle for your profile URL. Your full name, company name"
                            />
                            <SelectListGroup
                                placeholder="Status"
                                name="status"
                                value={this.state.status}
                                options={options}
                                onChange={this.onChange}
                                error={errors.status}
                                info="Give us some details about your status"
                            />
                            <TextFieldGroup
                                placeholder="Company"
                                name="company"
                                value={this.state.company}
                                error={errors.company}
                                info="Could be your company or you work for."
                                onChange={this.onChange}
                            />
                            <TextFieldGroup
                                placeholder="Website"
                                name="website"
                                value={this.state.website}
                                onChange={this.onChange}
                                error={errors.website}
                                info="Could be your website or a company one"
                            />
                            <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                onChange={this.onChange}
                                value={this.state.location}
                                error={errors.location}
                                info="City or city & state suggested (eg. Metro Manila, Philippines"
                            />
                            <TextFieldGroup
                                placeholder="* Skills"
                                name="skills"
                                value={this.state.skills}
                                onChange={this.onChange}
                                error={errors.skills}
                                info="Please use comma separated values"
                            />
                            <TextFieldGroup
                                placeholder="Github Username"
                                name="githubusername"
                                value={this.state.githubusername}
                                onChange={this.onChange}
                                error={errors.githubusername}
                                info="If you want your latest repos and a Github link, include your username"
                            />
                            <TextAreaFieldGroup
                                placeholder="Short Bio"
                                name="bio"
                                value={this.state.bio}
                                onChange={this.onChange}
                                error={errors.bio}
                                info="Tell us a little about yourself."
                            />
                            <div className="mb-3">
                                <button type="button" onClick={() => {
                                    this.setState(prevState => ({
                                        displaySocialInputs: !prevState.displaySocialInputs
                                    }))
                                }} className="btn btn-light">
                                    Add social Network links
                                </button>
                                <small className="text-muted ml-1">Optional</small>
                            </div>
                            {socialInputs}
                            <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object
}

const mapStateToProfile = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProfile, { createProfile, getCurrentProfile })(withRouter(CreateProfile));