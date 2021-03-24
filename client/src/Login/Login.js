import React, { useState } from "react";
import {Form, Button} from 'react-bootstrap';
import styles from './Login.module.css';
import {connect} from 'react-redux';
import {setAlert} from '../Redux/actions/alert';
import {login} from '../Redux/actions/auth';
import PropTypes from 'prop-types'
import { Redirect } from "react-router";

const Login = ({login, setAlert, isAuthenticated}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (password.length<6)
            setAlert('Password must contain atleast 6 characters', 'danger');
        else
            login({email, password})
    }

    // Redirect if isAuthenticated is true(logged in)
    if(isAuthenticated){
        return <Redirect to="/" />
    }

    return (
        <div>
            <div className={styles.login}>
                <Form onSubmit={handleSubmit}>
                    <h1 className={styles.login_heading}>Sign In</h1>
                    <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
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
                    style={validateForm() ? {backgroundColor:"purple"} : null} 
                    type="submit" 
                    disabled={!validateForm()} >
                    Login
                    </Button>
                </Form>
            </div>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps= state => ({
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, {login, setAlert})(Login);