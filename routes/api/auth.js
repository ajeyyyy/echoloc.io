const express = require('express');


const route = express.Router() ;

// @route GET api/auth
// @desc Test route
// @access Public
route.get('/', (req, res) => res.send('Auth API running'));

module.exports = route;