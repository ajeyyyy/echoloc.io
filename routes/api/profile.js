const express = require('express');
const router = express.Router() ;
const config = require('config');
const { body, validationResult } = require('express-validator');

const auth = require('../../middlewares/auth');
const ProfileModel = require('../../models/Profile.model');
const UserModel = require('../../models/User.model');


// @route GET api/profile/me
// @desc GET current user profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await ProfileModel.findOne({user: req.user.id})
        .populate('user', ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({ msg: 'There is no profile for this user'});
        }

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

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

// @route DELETE api/profile/
// @desc DELETE profile, user & post
// @access Private
router.delete('/', auth, async (req, res) => {
    try {
        // @todo - Remove user posts
        // Remove profile
        await ProfileModel.findOneAndRemove({ user: req.user.id });
        // Remove User
        await UserModel.findOneAndRemove({ _id: req.user.id });

        // Remove posts, likes and comments if you want to later

        res.json({ msg: 'User Deleted'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/profile/
// @desc Create or update the user profile
// @access Private
router.post('/', [
    auth, 
    [
        body('status').notEmpty().withMessage("Status is required"),
        body('skills').notEmpty().withMessage("Skills is required"),
    ]
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    const {company, website, location, status, skills, 
        bio, youtube, twitter, facebook, linkedin, instagram, github} = req.body;
    
    // Build Profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(status) profileFields.status = status;
    if(skills) profileFields.skills = skills.replace(/ +/g, "").split(',');
    if(bio) profileFields.bio = bio;

    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;
    if(github) profileFields.social.github = github;

    try {
        let profile = await ProfileModel.findOne({ user: req.user.id} );

        if(profile){
            //  Update
            profile = await ProfileModel.findOneAndUpdate(
                { user: req.user.id}, 
                { $set: profileFields }, 
                { new: true}
                );

            return res.json(profile);
        }
        // Create
        profile = new ProfileModel(profileFields);
        // Store profile in db
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

// @route PUT api/profile/experience
// @desc Add profile experience
// @access Private
router.put('/experience',
 auth, 
 [
    body('title').notEmpty().withMessage("Title is required"),
    body('company').notEmpty().withMessage("Company is required"),
    body('from').notEmpty().withMessage("From date is required")
 ],
 async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    
    const {title, company, location, from, to, current, description } = req.body;
    let experience = {title, company, location, from, to, current, description };

    try {
        let profile = await ProfileModel.findOne({ user: req.user.id} );
        
        profile.experience.unshift(experience);

        // Store profile in db
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route DELETE api/profile/experience/:exp_id
// @desc Delete profile experience
// @access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {

        let profile = await ProfileModel.findOne({ user: req.user.id} );
        // Equivalent to `parent.children.pull(_id)`
        profile.experience.id(req.params.exp_id).remove();
    
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        if(error.kind == 'ObjectId') return res.status(400).json({ msg: 'Experience not found' });
        res.status(500).send('Server Error');
    }
});

// @route PUT api/profile/education
// @desc Add profile education
// @access Private
router.put('/education',
 auth, 
 [
    body('school').notEmpty().withMessage("School is required"),
    body('degree').notEmpty().withMessage("Degree is required"),
    body('fieldofstudy').notEmpty().withMessage("Field of Study is required"),
    body('from').notEmpty().withMessage("From date is required")
 ],
 async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {school, degree, fieldofstudy, from, to, current, description } = req.body;

    let education = {school, degree, fieldofstudy, from, to, current, description };

    try {
        let profile = await ProfileModel.findOne({ user: req.user.id} );
        
        profile.education.unshift(education);

        // udape profile education in db
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route DELETE api/profile/education/:edu_id
// @desc Delete profile education
// @access Private
router.delete('/education/:edu_id',auth, async (req, res) => {
    try {

        let profile = await ProfileModel.findOne({ user: req.user.id} );
        // Equivalent to `parent.children.pull(_id)`
        profile.education.id(req.params.edu_id).remove();
    
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        if(error.kind == 'ObjectId') return res.status(400).json({ msg: 'Education not found' });
        res.status(500).send('Server Error');
    }
});

// @route GET api/profile/
// @desc Get all profiles
// @access Public
router.get('/', async (req, res) => {
    try {
        const profiles = await ProfileModel.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/profile
// @desc Test route
// @access Public
// router.get('/', (req, res) => res.send('Profile API running'));

module.exports = router;