import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCurrentProfile, deleteAccount} from '../../Redux/actions/profile';
import Spinner from '../layout/Spinner/Spinner';
import styles from './Dashboard.module.css';
import DashboardActions from './DashboardActions'; 
import Experience from './Experience/Experience';
import Education from './Education/Education';
import { Button } from 'react-bootstrap';

const Dashboard = ({getCurrentProfile, deleteAccount,
    auth: {user}, 
    profile: {profile, loading}}) => {

    useEffect(() => {
       getCurrentProfile();
    }, [getCurrentProfile])

    return  loading && profile === null ? <Spinner /> : <div className={styles.dashboard}>
        <h1 className={styles.dashboard__head}>Dashboard </h1>
        <h4><i class="bi bi-person-fill"></i> Welcome, {user && user.name}</h4>
        {profile !== null ? <>
            <DashboardActions />
            <Experience  experience={profile.experience}/>
            <Education education={profile.education}/>
            <div className="my-2">
                <Button onClick={() => deleteAccount()} variant="danger">
                <i class="bi bi-person-x-fill"/> Delete Account</Button>
            </div>
        </> : 
        <div >
            <p className={styles.dashboard__text}>You have not setup a profile please setup one</p>
            <br></br>
            <Link to="/create_profile" className="btn btn-dark" >
                Create Profile
            </Link>
        </div>
        }
    </div>;
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    profile: state.profileReducer,
});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);

