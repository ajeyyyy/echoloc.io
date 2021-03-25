import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {Table, Button} from 'react-bootstrap';
import {deleteEducation} from '../../../Redux/actions/profile';

const Education = ({education, deleteEducation}) => {
    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                <Moment format="MM-DD-YYYY" >{edu.from}</Moment> - {' '}
                {edu.to === null ? (' Now' ): (
                    <Moment format="MM-DD-YYYY" >{edu.to}</Moment>
                )}
            </td>
            <td>
                <Button onClick={() => deleteEducation(edu._id)} variant="warning">Delete</Button>
            </td>
        </tr>
    ))
    return (
        <div>
            <h2 class="my-2">Education Credentials</h2>
            <Table striped bordered hover variant="dark" responsive>
                <thead>
                <tr>
                    <th>School</th>
                    <th className="hide-sm">Degree</th>
                    <th className="hide-sm">Timespan</th>
                    <th >Remove ?</th>
                </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </Table>
        </div>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
}

export default connect(null, {deleteEducation})(Education);
