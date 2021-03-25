import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link, withRouter} from 'react-router-dom';
import {addExperience} from '../../../Redux/actions/profile';
import styles from './ProfileForm.module.css';
import {Form, Button, Collapse} from 'react-bootstrap';
import Datetime from 'react-datetime';

const AddExperience = ({addExperience, history}) => {
    const [open, setOpen] = useState(true);

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
    });

    const {title, company, location, from, to, current, description } = formData;

    const onChangeHandler = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmitHandler = e => {
        e.preventDefault();
        addExperience(formData, history);
    }
    
    const changeDate = (e, name) => {
        console.log(name);
        setFormData({...formData, [name]: e.format ? e.format("MM-DD-YYYY") : ''}) 
   }
   
    return (
        <div className={styles.profile}>
            <Form onSubmit={(e) => onSubmitHandler(e)}>
            <h1 className={styles.profile_heading}>Add Experience</h1>
                <Form.Group size="lg" controlId="title">
                    <Form.Control name="title" value={title} onChange={e => onChangeHandler(e)}
                     type="text" placeholder="* Job Title" />
                </Form.Group>
                <Form.Group  size="lg" controlId="company">
                    <Form.Control name="company" value={company} onChange={e => onChangeHandler(e)}
                     type="text" placeholder="* Company" />
                </Form.Group>
                <Form.Group size="lg" controlId="location">
                    <Form.Control name="location" value={location} onChange={e => onChangeHandler(e)}
                    type="text" placeholder="Location" />
                </Form.Group>
                <Datetime name="from" value={from} onChange={e => changeDate(e, "from")}
                inputProps={{placeholder: '* From(mm/dd/yy)'}} dateFormat="MM-DD-YYYY" timeFormat={false}/>
                <Form.Check
                    type="checkbox"
                    className="my-1 mr-sm-2"
                    id="customControlInline"
                    label="Current Job"
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
                    as="textarea" placeholder="Job Description" />
                </Form.Group>
                
                <div className={styles.formBtns}>
                    <Button as={Link} to="/dashboard" variant="secondary">Go Back</Button>
                    <Button type="submit" variant="success">Submit</Button>
                </div>
                
            </Form>
        </div>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
}

export default connect(null, {addExperience})(withRouter(AddExperience));
