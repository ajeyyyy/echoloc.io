import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Row, Col, Image } from 'react-bootstrap';
import styles from './Profile.module.css';

const ProfileTop = ({profile: {
    company, 
    website, 
    location, 
    status, 
    social, 
    user: {name, avatar}
}}) => {
    return (
        <div>
            <Card className={styles.profileTop}>
                <Container style={{padding: '20px', textAlign: 'center'}}>
                    <Row>
                        <Col>
                        <Image className={styles.post__userImg} src={avatar} roundedCircle/>
                        <h3 className={styles.heading}>{name}</h3>
                        <h4 className={styles.profile__company}>{status} {company && `at ${company}`}</h4>
                        <p>{location}</p>
                        
                        <div className={styles.socialIcons}>
                            {
                                website && (
                                    <a href={website} target="_blank" rel="noopener noreferrer">
                                        <i style={{fontSize: "2rem", marginRight: '5px'}} className="bi bi-globe2"></i>
                                    </a>
                                )
                            }
                            {
                                social && social.twitter && (
                                    <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                                        <i style={{fontSize: "2rem", marginRight: '5px'}} className="bi bi-twitter"></i>
                                    </a>
                                )
                            }
                            {
                                social && social.facebook && (
                                    <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                                        <i style={{fontSize: "2rem", marginRight: '5px'}} className="bi bi-facebook"></i>
                                    </a>
                                )
                            }
                            {
                                social && social.linkedin && (
                                    <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                                        <i style={{fontSize: "2rem", marginRight: '5px'}} className="bi bi-linkedin"></i>
                                    </a>
                                )
                            }
                            {
                                social && social.youtube && (
                                    <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                                        <i style={{fontSize: "2rem", marginRight: '5px'}} className="bi bi-youtube"></i>
                                    </a>
                                )
                            }
                            {
                                social && social.instagram && (
                                    <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                                        <i style={{fontSize: "2rem", marginRight: '5px'}} className="bi bi-instagram"></i>
                                    </a>
                                )
                            }
                        </div>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileTop;
