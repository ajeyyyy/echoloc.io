import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {Table, Button} from 'react-bootstrap';
import {deleteExperience} from '../../../Redux/actions/profile';

const Experience = ({experience, deleteExperience}) => {
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format="MM-DD-YYYY" >{exp.from}</Moment> - {' '}
                {exp.to === null ? (' Now' ): (
                    <Moment format="MM-DD-YYYY" >{exp.to}</Moment>
                )}
            </td>
            <td>
                <Button onClick={() => deleteExperience(exp._id)} variant="warning">Delete</Button>
            </td>
        </tr>
    ))
    return (
        <div>
            <h2 class="my-2">Experience Credentials</h2>
            <Table striped bordered hover variant="dark" responsive>
                <thead>
                <tr>
                    <th>Company</th>
                    <th className="hide-sm">Title</th>
                    <th className="hide-sm">Timespan</th>
                    <th >Remove ?</th>
                </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </Table>
        </div>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
}

export default connect(null, {deleteExperience})(Experience);
