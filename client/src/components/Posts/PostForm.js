import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { createPost } from '../../Redux/actions/post';
import {connect} from 'react-redux';
import {Form, Button} from 'react-bootstrap';
import styles from './PostForm.module.css';

const PostForm = ({createPost}) => {
    
    const [text, setText] = useState('');

    return (
        <div className={styles.postForm}>
            <Form onSubmit={(e) => {
                e.preventDefault();
                createPost({text});
                setText(' ');
                }}>
                <Form.Group size="lg" controlId="text">
                    <Form.Control name="text" value={text} onChange={e => setText(e.target.value)}
                    as="textarea" placeholder="What do you want to talk about?" />
                </Form.Group>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button className={styles.postForm__btn} type="submit" variant="info">Post</Button>
                </div>
            </Form>
        </div>
    )
}

PostForm.propTypes = {
    createPost: PropTypes.func.isRequired,
}

export default connect(null, {createPost})(PostForm);
