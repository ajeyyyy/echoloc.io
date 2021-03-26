import React from 'react';
import PropTypes from 'prop-types';
import styles from './Profile.module.css';
import { Card } from 'react-bootstrap';

const ProfileAbout = ({
    profile: {
        bio,
        skills,
        user: {name}
    }
}) => {
    return (
        <Card className={styles.profileAbout}>
            {bio && 
                <>
                    <Card.Title className={styles.heading}>{name.trim().split(' ')[0]}'s bio</Card.Title>
                    <Card.Text>
                        {bio}
                    </Card.Text>
                </>
            }
            
            <hr/>
            <Card.Title className={styles.heading}>Skills</Card.Title>
            <Card.Text className={styles.profileSkills}>
                {skills.map((skill, index) => (
                    
                    <div key={index} className="p-1">
                        <i style={{fontSize: "20px", marginRight: '5px'}}  className="bi bi-check" />{skill}
                    </div>
                    
                ))}
            </Card.Text>
        </Card>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileAbout
