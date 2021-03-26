import React from 'react';
import styles from './Home.module.css';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from "react-router";

const Home = ({isAuthenticated}) => {

    // Redirect if isAuthenticated is true(logged in)
    if(isAuthenticated){
        return <Redirect to="/posts" />
    }
    return (
        <div className={styles.home}>
           <h1>Echoloc.io</h1>
           <h3 className={styles.homeText}>Create a job profile/portfolio, share posts and get help from other job seekers and recruiters</h3>
            <div className={styles.home_btn}>
               <Button className={styles.signUp}  as={Link} to={`/register`} variant="info">
                    Sign Up
                </Button>
                <Button as={Link} to={`/login`} style={{backgroundColor: 'purple'}}>
                    Login
                </Button>
            </div>
        
        </div>
    )
}

Home.propTypes = {
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps= state => ({
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps)(Home);
