import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link, withRouter} from 'react-router-dom';
import {Form, Button, Collapse, Row, Col} from 'react-bootstrap';
import styles from './ProfileForm.module.css';
import {createProfile} from '../../../Redux/actions/profile';

const ProfileForm = ({createProfile, history}) => {
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        company: '', 
        website: '', 
        location: '', 
        status: '', 
        skills: '', 
        bio: '', 
        youtube: '', 
        twitter: '', 
        facebook: '', 
        linkedin: '', 
        instagram: '', 
        github: ''

    });

    const {company, website, location, status, skills, 
        bio, youtube, twitter, facebook, linkedin, instagram, github} = formData;

    const onChangeHandler = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmitHandler = e => {
        e.preventDefault();
        createProfile(formData, history);
    }
    return (
        <div className={styles.profile}>
            <Form onSubmit={(e) => onSubmitHandler(e)}>
            <h1 className={styles.profile_heading}>Create your Account</h1>
                <Form.Group size="lg" controlId="status">
                    <Form.Control name="status" value={status} onChange={e => onChangeHandler(e)} as="select" size="me"  custom>  
                        <option value="default">* Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Intern">Student</option>
                        <option value="Other">Other</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group  size="lg" controlId="company">
                    <Form.Control name="company" value={company} onChange={e => onChangeHandler(e)}
                     type="text" placeholder="Company or Organization" />
                </Form.Group>
                <Form.Group size="lg" controlId="website">
                    <Form.Control name="website" value={website} onChange={e => onChangeHandler(e)}
                     type="text" placeholder="Website" />
                </Form.Group>
                <Form.Group size="lg" controlId="location">
                    <Form.Control name="location" value={location} onChange={e => onChangeHandler(e)}
                    type="text" placeholder="Location" />
                </Form.Group>
                <Form.Group size="lg" controlId="skills">
                    <Form.Control name="skills" value={skills} onChange={e => onChangeHandler(e)}
                    type="text" placeholder="* Skills (enter comma separated values like Html, css, ..)" />
                </Form.Group>
                <Form.Group size="lg" controlId="bio">
                    <Form.Control name="bio" value={bio} onChange={e => onChangeHandler(e)}
                    as="textarea" placeholder="Bio" />
                </Form.Group>
                <Button
                    variant="info"
                    onClick={() => setOpen(!open)}
                    aria-controls={styles.collapse_content}
                    aria-expanded={open}
                >
                    Add Socials
                </Button><span>  optional</span>
                <Collapse in={open}>
                    <div id={styles.collapse_content}>
                        <Form.Group as={Row} size="lg" controlId="twitter">
                            <Form.Label column sm={1}>
                                <i class="bi bi-twitter"/>
                            </Form.Label>
                            <Col>
                                <Form.Control name="twitter" value={twitter} onChange={e => onChangeHandler(e)}
                                type="text" placeholder="twitter URL" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} size="lg" controlId="facebook">
                            <Form.Label column sm={1}>
                                <i class="bi bi-facebook" />
                            </Form.Label>
                            <Col>
                                <Form.Control name="facebook" value={facebook} onChange={e => onChangeHandler(e)}
                                type="text" placeholder="facebook URL" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} size="lg" controlId="youtube">
                            <Form.Label column sm={1}>
                                <i class="bi bi-youtube"/>
                            </Form.Label>
                            <Col>
                                <Form.Control name="youtube" value={youtube} onChange={e => onChangeHandler(e)}
                                type="text" placeholder="youtube URL" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} size="lg" controlId="linkedin">
                            <Form.Label column sm={1}>
                                <i class="bi bi-linkedin"/>
                            </Form.Label>
                            <Col>
                                <Form.Control name="linkedin" value={linkedin} onChange={e => onChangeHandler(e)}
                                type="text" placeholder="linkedin URL" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} size="lg" controlId="instagram">
                            <Form.Label column sm={1}>
                                <i class="bi bi-instagram"/>
                            </Form.Label>
                            <Col>
                                <Form.Control name="instagram" value={instagram} onChange={e => onChangeHandler(e)}
                                type="text" placeholder="instagram URL" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} size="lg" controlId="github">
                            <Form.Label column sm={1}>
                                <i class="bi bi-github"/>
                            </Form.Label>
                            <Col>
                                <Form.Control name="github" value={github} onChange={e => onChangeHandler(e)}
                                type="text" placeholder="github URL" />
                            </Col>
                        </Form.Group>
                    </div>
                </Collapse>
                <br/>
                <div className={styles.formBtns}>
                    <Button as={Link} to="/dashboard" variant="secondary">Go Back</Button>
                    <Button type="submit" variant="success">Submit</Button>
                </div>
                
            </Form>
        </div>
    )
}

ProfileForm.propTypes = {
    createProfile: PropTypes.func.isRequired,
}


export default connect(null, {createProfile})(withRouter(ProfileForm));
