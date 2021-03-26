import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Button, Card, Container, Row, Col, Image } from 'react-bootstrap';
import styles from '../PostItem.module.css';
import {deleteComment} from '../../../Redux/actions/post';

const CommentItem = ({
    postId,
    comment: { _id, text, name, avatar, user, date },
    auth,
    deleteComment
}) => {
    return (
        <div>
             <Card className={styles.post}>
                <Container style={{padding: '0'}}>
                    <Row className={styles.row}>
                        <Col className={styles.post__user} sm={2}>
                            <Image className={styles.post__userImg} src={avatar} roundedCircle/>
                            <p>{name}</p>
                        </Col>
                        <Col sm={10}>
                            <Card.Body>{text}</Card.Body>
                        </Col>
                    </Row>   
                    {!auth.loading && auth.user && user === auth.user._id && 
                        <Button style={{ display: 'flex', marginLeft: 'auto', marginBottom: '5px'}} 
                        onClick={() => deleteComment(postId, _id)} 
                        className={styles.post_button} variant="danger"><i className="bi bi-x-circle-fill"></i></Button>
                    }          
                    <Card.Footer className="text-muted">Posted on <Moment format="MMM DD, YYYY h:mm a">{date}</Moment></Card.Footer>   
                </Container>
            </Card>
        </div>
    )
}

CommentItem.propTypes = {
    auth: PropTypes.object.isRequired,
    comment: PropTypes.number.isRequired,
    postId: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

export default connect(mapStateToProps, {deleteComment})(CommentItem);
