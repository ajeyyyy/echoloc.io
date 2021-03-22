const express = require('express');


const route = express.Router() ;

// @route GET api/post
// @desc Test route
// @access Public
route.get('/', (req, res) => res.send('Post API running'));

module.exports = route;