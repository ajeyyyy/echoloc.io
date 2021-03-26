import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPost} from '../../Redux/actions/post';
import Spinner from '../layout/Spinner/Spinner';
import PostItem from './PostItem';
import styles from './Posts.module.css';
import PostForm from './PostForm';

const Posts = ({post: {posts, loading}, getPost}) => {

    useEffect(() => {
        getPost()
      }, [getPost])

    return loading ? <Spinner /> : (
       <div className={styles.posts}>
           <h1 className={styles.posts__head}>Posts</h1>
           <h4><i class="bi bi-person-fill"></i> Welcome to Echoloc.io</h4>
           <PostForm />
           <div>
               {posts.map(post => (
                   <PostItem key={post.id} post={post} />
               ))}
               
           </div>
       </div>
    )
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    post: state.postReducer
});

export default connect(mapStateToProps, {getPost})(Posts);
