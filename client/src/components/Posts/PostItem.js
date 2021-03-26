import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import { Button, Card, Container, Row, Col, Image } from 'react-bootstrap';
import styles from './PostItem.module.css';
import {addLike , deletePost} from '../../Redux/actions/post';

const PostItem = ({auth, post, addLike, deletePost, showActions}) => {
    const {_id, user, text, name, avatar, likes, comments, date} = post;

    const [userLiked, setUserLiked] = useState(false);

    useEffect(() => {
        if(!auth.loading && auth.user )
        {
            const res = likes.findIndex(like => like._id === auth.user._id);
            if(res >= 0)
                setUserLiked(true);
            else
                setUserLiked(false);
        }
    }, [likes, auth]);

    
    return (
        <div>
            <Card className={styles.post}>
                <Container style={{padding: '0'}}>
                    <Row className={styles.row}>
                        <Col as={Link} to={`/profile/${user}`} className={styles.post__user} sm={2}>
                            <Image className={styles.post__userImg} src={avatar} roundedCircle/>
                            <p>{name}</p>
                        </Col>
                        <Col sm={10}>
                            <Card.Body>{text}</Card.Body>
                        </Col>
                    </Row>  
                    {showActions && <> 
                        <Card.Body className={styles.post__actions}>
                            <div className={styles.post_links}>
                                <Card.Link onClick={e => addLike(_id)} href="#">
                                <span>
                                    like 
                                    {userLiked ? <i className="bi bi-hand-thumbs-up-fill" /> : 
                                            <i className="bi bi-hand-thumbs-up" />
                                    }{likes.length}
                                    </span> 
                                </Card.Link>
                                {/* <Card.Link onClick={e => removeLike(_id)} href="#">
                                    <span>dislike<i className="bi bi-hand-thumbs-down" /></span>
                                </Card.Link> */}
                            </div>
                            <div className={styles.post_links}>
                                <Link to={`/post/${_id}`}>
                                    <Button className={styles.post_button}
                                variant="info">Comment {comments?.length}</Button>
                                </Link>
                                {!auth.loading && auth.user && user === auth.user._id && 
                                    <Button onClick={(e) => deletePost(_id)} className={styles.post_button} variant="danger">Delete Post</Button>
                                }
                            </div>
                        </Card.Body>
                    </>}
                    <Card.Footer className="text-muted">Posted on <Moment format="MMM DD, YYYY h:mm a">{date}</Moment></Card.Footer>   
                </Container>
            </Card>
        </div>
    )
}

PostItem.defaultProps ={
    showActions: true
}

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.authReducer,
})

export default connect(mapStateToProps, {addLike, deletePost})(PostItem);
