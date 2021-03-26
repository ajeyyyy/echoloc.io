const express = require('express');
const router = express.Router() ;
const { body, validationResult } = require('express-validator');

const auth = require('../../middlewares/auth');
const UserModel = require('../../models/User.model');
const PostModel = require('../../models/Post.model');


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