const express = require('express');


const route = express.Router() ;

// @route GET api/users
// @desc Test route
// @access Public
route.get('/', (req, res) => res.send('User API running'));

module.exports = route;