import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link, withRouter} from 'react-router-dom';
import {addEducation} from '../../../Redux/actions/profile';
import styles from './ProfileForm.module.css';
import {Form, Button, Collapse} from 'react-bootstrap';
import Datetime from 'react-datetime';

const AddEducation = ({addEducation, history}) => {
    const [open, setOpen] = useState(true);

    const [formData, setFormData] = useState({
        degree: '',
        school: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: '',
    });

    const {degree, school, fieldofstudy, from, to, current, description } = formData;

    const onChangeHandler = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmitHandler = e => {
        e.preventDefault();
        addEducation(formData, history);
    }
    
    const changeDate = (e, name) => {
        console.log(name);
        setFormData({...formData, [name]: e.format ? e.format("MM-DD-YYYY") : ''}) 
   }
   
    return (
        <div className={styles.profile}>
            <Form onSubmit={(e) => onSubmitHandler(e)}>
            <h1 className={styles.profile_heading}>Add Education</h1>
                <Form.Group size="lg" controlId="school">
                    <Form.Control name="school" value={school} onChange={e => onChangeHandler(e)}
                     type="text" placeholder="* School" />
                </Form.Group>
                <Form.Group  size="lg" controlId="degree">
                    <Form.Control name="degree" value={degree} onChange={e => onChangeHandler(e)}
                     type="text" placeholder="* Degree" />
                </Form.Group>
                <Form.Group size="lg" controlId="fieldofstudy">
                    <Form.Control name="fieldofstudy" value={fieldofstudy} onChange={e => onChangeHandler(e)}
                    type="text" placeholder="* Field of Study" />
                </Form.Group>
                <Datetime name="from" value={from} onChange={e => changeDate(e, "from")}
                inputProps={{placeholder: '* From(mm/dd/yy)'}} dateFormat="MM-DD-YYYY" timeFormat={false}/>
                <Form.Check
                    type="checkbox"
                    className="my-1 mr-sm-2"
                    id="customControlInline"
                    label="Currently enrolled"
                    onClick={() => setOpen(!open)}
                    name="current" 
                    value={current} onChange={e => onChangeHandler(e)}
                    custom
                />
                <Collapse in={open}>
                    <Datetime name="to" value={to} onChange={e => changeDate(e, "to")}
                    inputProps={{placeholder: 'To(mm/dd/yy)'}} dateFormat="MM-DD-YYYY" timeFormat={false}/>
                </Collapse>
                <br/>
                <Form.Group size="lg" controlId="bio">
                    <Form.Control name="description" value={description} onChange={e => onChangeHandler(e)}
                    as="textarea" placeholder="Description on your study" />
                </Form.Group>
                
                <div className={styles.formBtns}>
                    <Button as={Link} to="/dashboard" variant="secondary">Go Back</Button>
                    <Button type="submit" variant="success">Submit</Button>
                </div>
                
            </Form>
        </div>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
}

export default connect(null, {addEducation})(withRouter(AddEducation));
