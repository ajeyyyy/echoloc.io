import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addComment} from '../../../Redux/actions/post';
import {Form, Button} from 'react-bootstrap';
import styles from '../PostForm.module.css';

const CommentForm = ({postId, addComment}) => {

    const [text, setText] = useState('');

    return (
        <div className={styles.postForm}>
            <Form onSubmit={(e) => {
                e.preventDefault();
                addComment(postId, {text});
                setText(' ');
                }}>
                <Form.Group size="lg" controlId="text">
                    <Form.Control name="text" value={text} onChange={e => setText(e.target.value)}
                    as="textarea" placeholder="leave a comment..." />
                </Form.Group>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button className={styles.postForm__btn} type="submit" variant="info">Comment</Button>
                </div>
            </Form>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, {addComment})(CommentForm);
