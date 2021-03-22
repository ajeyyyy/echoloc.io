const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');

        if(!token) return res.status(401).json({msg: 'No token, Authorization denied'});

        const decoded = jwt.verify(token, config.get('jwtToken'));
        // setting the authorized user to a field in request
        req.user = decoded.user;

        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({msg: 'Token is not valid' });
    }
}

module.exports = auth;