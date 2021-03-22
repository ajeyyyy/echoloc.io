const express = require('express');
const router = express.Router() ;
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

const UserModel = require('../../models/User.model');
const auth = require('../../middlewares/auth');

// @route GET api/auth
// @desc Get authenticated user
// @access Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/auth
// @desc Login user & get token
// @access Public
router.post('/', 
body('email').isEmail().withMessage("Email is not valid"),
body('password').exists().withMessage("Password is required"),
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    const { email, password} = req.body;
    try {
         // Check if users exist
        let user = await UserModel.findOne({ email });
        if(!user) return res.status(400).json({errors: [{ msg: 'Invalid credentials' }]});
       
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({errors: [{ msg: 'Invalid credentials' }]});

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
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/auth
// @desc Test route
// @access Public
// route.get('/', (req, res) => res.send('Auth API running'));

module.exports = router;