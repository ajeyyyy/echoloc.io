import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Alert} from 'react-bootstrap';

const AlertComponent = ({alerts}) => 
alerts!=null &&
alerts.length>0 &&
alerts.map(alert => (
    <Alert id={alert.id} variant={alert.alertType}>
        {alert.msg}
    </Alert>
    )
);

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps= state => ({
    alerts: state.alertReducer
});

export default connect(mapStateToProps)(AlertComponent);
