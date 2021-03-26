const express = require('express');
const router = express.Router() ;
const { body, validationResult } = require('express-validator');

const auth = require('../../middlewares/auth');
const UserModel = require('../../models/User.model');
const PostModel = require('../../models/Post.model');

// @route POST api/post
// @desc Create a post
// @access Private
router.post('/',
auth,
body('text').notEmpty().withMessage("Text is required"),
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    try {
        const user = await UserModel.findById(req.user.id).select('-password');

        const postFields = {
            user: req.user.id,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar
        }
        const newPost = new PostModel(postFields);

        const post = await newPost.save();
        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/post
// @desc Get all posts
// @access Public
router.get('/', async (req, res) => {
    try {
        const posts = await PostModel.find().sort({date: -1});
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/post/:id
// @desc Get post by id
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if(!post) return res.status(400).json({ msg: 'Post not found' });

        res.json(post);
    } catch (error) {
        console.error(error.message);
        if(error.kind == 'ObjectId') return res.status(400).json({ msg: 'Post not found' });
        res.status(500).send('Server Error');
    }
});

// @route DELET api/post/:id
// @desc Delete a post by id
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let post = await PostModel.findById(req.params.id);

        if(!post) return res.status(400).json({ msg: 'Post not found' });
        // Check if user posted is the same as logged in user
        if(post.user.toString() !== req.user.id)
            return res.status(401).json({ msg: 'User not authorized'});

        await post.remove();

        res.json({msg: 'Post removed'});
    } catch (error) {
        console.error(error.message);
        if(error.kind == 'ObjectId') return res.status(400).json({ msg: 'Post not found' });
        res.status(500).send('Server Error');
    }
});

// @route PUT api/post/like/:id
// @desc Like a post by id
// @access Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if(!post) return res.status(400).json({ msg: 'Post not found' });

        if(post.likes.id(req.user.id))
            post.likes.id(req.user.id).remove();
            // return res.status(400).json({ msg: 'Post already liked'});
        else
            post.likes.unshift({ _id: req.user.id, user: req.user.id });

        await post.save();
        res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        if(error.kind == 'ObjectId') return res.status(400).json({ msg: 'Post not found' });
        res.status(500).send('Server Error');
    }
});

// @route PUT api/post/unlike/:id
// @desc UnLike a post by id
// @access Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if(!post) return res.status(400).json({ msg: 'Post not found' });
   
        if(!post.likes.id(req.user.id))
            return res.status(400).json({ msg: 'Post has not been liked yet'});

        post.likes.id(req.user.id).remove();

        await post.save();
        res.json({msg: 'Post has been unliked'});
    } catch (error) {
        console.error(error.message);
        if(error.kind == 'ObjectId') return res.status(400).json({ msg: 'Post not found' });
        res.status(500).send('Server Error');
    }
});

// @route POST api/post/comment/:id
// @desc Comment on a post
// @access Private
router.post('/comment/:id',
 auth,
body('text').notEmpty().withMessage("Text is required"),
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        const post = await PostModel.findById(req.params.id);

        const commentFields = {
            user: req.user.id,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar
        }

        post.comments.unshift(commentFields);
        await post.save();
        
        res.json(post.comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route DELETE api/post/comment/:id/:comment_id
// @desc Delete a Comment on a post
// @access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        const comment = post.comments.id(req.params.comment_id);
        
        if(!comment) return res.status(400).json({ msg: 'Comment does not exists'});

        if(comment.user.toString() !== req.user.id) 
            return res.status(401).json({ msg: 'User not authorized'});
       
        post.comments.id(req.params.comment_id).remove();
        await post.save();
        
        res.json({ msg: 'Comment is deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/post
// @desc Test route
// @access Public
// router.get('/', (req, res) => res.send('Post API running'));

module.exports = router;