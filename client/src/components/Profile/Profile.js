import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner/Spinner';
import {getProfileById} from '../../Redux/actions/profile';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styles from './Profile.module.css';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { Card, Container, Row, Col } from 'react-bootstrap';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';

const Profile = ({getProfileById, match, 
    profile: {profile, loading}, auth}) => {

    
    useEffect(() => {
       getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);

    return (
        <>
            {loading === false && profile === null ? <>
                <div className={styles.profile}>
                <Button as={Link} style={{marginBottom: '5px'}} to="/posts" variant="secondary">{'<<'}Back to Posts</Button>
                    <Card className={styles.profileTop} style={{padding: '20px', 
                                    textAlign: 'center',
                                    }}>
                    <h3 className={styles.heading}>
                        User did not create his profile yet
                    </h3>
                    </Card>
                </div>
            </> :
        
        <>
        {loading || profile === null ? <Spinner /> : <>
        
        <div className={styles.profile}>
        <Button as={Link} style={{marginBottom: '5px'}} to="/posts" variant="secondary">{'<<'}Back to Posts</Button>
            <ProfileTop profile={profile}/>
            <ProfileAbout profile={profile}/>
            <div className={styles.profile__credentials}>
                <Card className={styles.profileExperience}>
                <Container style={{padding: '20px', 
                                    textAlign: 'left',
                                    }}>
                <Card.Title className={styles.heading}>Experience</Card.Title>
                    {profile.experience.length > 0 ? <> 
                        {profile.experience.map(experience => (
                            <>
                                <Row>
                                    <Col>
                                        <ProfileExperience 
                                        key={experience._id}
                                        experience={experience}
                                        />
                                    </Col>
                                </Row>
                            <hr/>
                            </>
                            
                            
                        ))}
                        
                    </>: (<h4>No Experience added</h4>) }
                    
                </Container>
                </Card> 
                
                <Card className={styles.profileEducation}>
                <Container style={{padding: '20px', textAlign: 'left'}}>
                <Card.Title className={styles.heading}>Education</Card.Title>
                    {profile.education.length > 0 ? <> 
                        {profile.education.map(education => (
                            <>
                                <Row>
                                    <Col>
                                        <ProfileEducation 
                                        key={education._id}
                                        education={education}
                                        />
                                    </Col>
                                </Row>
                            <hr/>
                            </>
                            
                            
                        ))}
                        
                    </>: (<h4>No Education added</h4>) }
                    
                </Container>
                </Card>        
            </div>
            
        </div>

        {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
            <Button as={Link} style={{marginBottom: '5px'}} to="/edit_profile" variant="dark"> Edit Profile</Button>
        )}
    </>}
    </>
    }
    </>);
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStatesToProps = state => ({
    profile: state.profileReducer,
    auth: state.authReducer,
    
});

export default connect(mapStatesToProps, {getProfileById})(Profile);
