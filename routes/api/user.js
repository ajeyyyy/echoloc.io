const express = require('express');
const router = express.Router() ;
const { body, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const UserModel = require('../../models/User.model');

// @route POST api/user
// @desc Register an user
// @access Public
router.post('/',
body('name').notEmpty().withMessage("Name is required"),
body('email').isEmail().withMessage("Email is not valid"),
body('password').isLength({ min: 6 }).withMessage("Password must have minimum of 6 characters"),
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const {name, email, password} = req.body;
    try {
         // Check if users exist
         let user = await UserModel.findOne({ email });
         if(user) return res.status(400).json({errors: [{ msg: 'User already exists' }]});
         // Get Users gravatar
         const avatar = gravatar.url(email, {
             s: '200',
             r: 'pg',
             d: 'mm'
         });
         user = new UserModel({
             name,
             email,
             password,
             avatar
         });
 
         // Exncrypt Password
         const salt = await bcrypt.genSalt(10);
         user.password = await bcrypt.hash(password, salt);

         // save user in DB
         await user.save();
 
         // Return JWT
         const payload = {
             user: {
                 id: user.id
             }
         };
 
         jwt.sign(payload,
             config.get('jwtToken'),
             { expiresIn: 600 * 600 },
             (err, token) => {
                 if(err)
                     throw err;
                 res.json({token});
             }
         );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/users
// @desc Test route
// @access Public
router.get('/', (req, res) => res.send('User API running'));

module.exports = router;