import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({education: {
    school,
    degree,
    fieldofstudy,
    to,
    from,
    description
}}) => <div>
    <h3>{school}</h3>
    <p>
        <Moment format='MMM YYYY'>{from}</Moment> - {!to ? 'Now' : <Moment format='MMM YYYY'>{to}</Moment>}
    </p>
    <p>
        <strong>Degree: </strong>{degree}
    </p>
    <p>
        <strong>Field of Study: </strong>{fieldofstudy}
    </p>
    <p>
        <strong>Description: </strong>{description}
    </p>
</div>

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired,
}

export default ProfileEducation;
