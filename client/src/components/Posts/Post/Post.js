import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../../layout/Spinner/Spinner';
import {viewPost} from '../../../Redux/actions/post';
import PostItem from '../PostItem';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({post: { post, loading, comments}, viewPost, match}) => {

    useEffect(() => {
        console.log(match.params.id);
        viewPost(match.params.id);
    }, [viewPost, match.params.id, comments]);

    return loading || post === null ? <Spinner /> : <>
        <Button as={Link} style={{marginBottom: '5px'}} to="/posts" variant="secondary">{'<<'} Back to Posts</Button>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />

        {post.comments.map(comment => (
             <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
       
    </>
}

Post.propTypes = {
    viewPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.postReducer
})

export default connect(mapStateToProps, {viewPost})(Post)
