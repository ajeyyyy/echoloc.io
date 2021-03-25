import React from 'react';
import { Link} from 'react-router-dom';
import { Button}  from 'react-bootstrap';
import styles from './DashboardActions.module.css';

const DashboardActions = () => {
    return (
        <div className={styles.actionItems}>
            <Button className={styles.actionBtn} as={Link} to="/edit_profile" variant="secondary">
                <i class="bi bi-person-circle"/> Edit Profile
            </Button>
            <Button className={styles.actionBtn} as={Link} to="/add_experience" variant="secondary">
                <i class="bi bi-person-circle"/> Add Experience
            </Button>
            <Button className={styles.actionBtn} as={Link} to="/add_education" variant="secondary">
                <i class="bi bi-person-circle"/> Add Eduation
            </Button>
        </div>
    )
}

export default DashboardActions;
