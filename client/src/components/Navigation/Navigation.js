import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

import styles from './Navigation.module.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../Redux/actions/auth';

const Navigation =({logout, auth: {isAuthenticated, loading}}) => {

    const authLinks = (
        <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    
                    <Nav.Link onClick={logout} as={Link} to="/">
                        <i style={{fontSize: "1rem", color: "white",fonrWeight: "bold"}} class="bi bi-box-arrow-right"></i>{' '}
                        <span className={styles.nav_link}>Logout</span>
                    </Nav.Link>
                        {/* <Nav.Link as={Link} to="/register"><p className={styles.nav_link}>Register</p></Nav.Link> */}
                    </Nav>
                   
            </Navbar.Collapse>
        </>
    );

    const guestLinks = (
        <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/login"><p className={styles.nav_link}>Sign in</p></Nav.Link>
                        <Nav.Link as={Link} to="/register"><p className={styles.nav_link}>Register</p></Nav.Link>
                    </Nav>
            </Navbar.Collapse>
        </>
    );
    return (
        <Navbar sticky="top" expand="lg">
            <Navbar.Brand as={Link} to="/"><p className={styles.nav_brand}>echoloc.io</p></Navbar.Brand>
            
            {!loading && isAuthenticated ? authLinks : guestLinks } 
        </Navbar>
    )
}

Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps= state => ({
    auth: state.authReducer
});
export default connect(mapStateToProps, {logout})(Navigation);
