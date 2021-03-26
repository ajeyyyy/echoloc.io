import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap';
import styles from './Register.module.css';
import {connect} from 'react-redux';
import {setAlert} from '../Redux/actions/alert';
import {register} from '../Redux/actions/auth';
import PropTypes from 'prop-types'
import { Redirect } from "react-router";

function Register({setAlert, register, isAuthenticated}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        if (password.length<6)
            setAlert('Password must contain atleast 6 characters', 'danger');
        else
            register({name, email, password});
    }
    function validateForm() {
        return name.length>0 && email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
    event.preventDefault();
    }

     // Redirect if isAuthenticated is true(logged in)
     if(isAuthenticated){
        return <Redirect to="/dashboard" />
    }

    return (
        <div>
             <div className={styles.register}>
                
                <Form onSubmit={handleSubmit}>
                    <h1 className={styles.register_heading}>Sign Up</h1>
                    <Form.Group size="lg" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        autoFocus={true}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus={true}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </Form.Group>
                    <Button block size="lg" variant="secondary" 
                    onClick={(e) => onSubmit(e)}
                    style={validateForm() ? {backgroundColor:"purple"} : null} type="submit" 
                    disabled={!validateForm()} >
                    Register
                    </Button>
                </Form>
            </div>
        </div>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
} 

const mapStateToProps= state => ({
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, register})(Register);
