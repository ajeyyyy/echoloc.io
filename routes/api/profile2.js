const express = require('express');
const router = express.Router() ;
const config = require('config');
const { body, validationResult } = require('express-validator');

const auth = require('../../middlewares/auth');
const ProfileModel = require('../../models/Profile.model');
const UserModel = require('../../models/User.model');
const PostModel = require('../../models/Post.model');



// @route GET api/profile/user/:user_id
// @desc Get profile by user id
// @access Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await ProfileModel.findOne({user: req.params.user_id })
        .populate('user', ['name', 'avatar']);

        if(!profile) return res.status(400).json({ msg: 'Profile not found' });

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        if(error.kind == 'ObjectId') return res.status(400).json({ msg: 'Profile not found' });
        res.status(500).send('Server Error');
    }
});



module.exports = router;