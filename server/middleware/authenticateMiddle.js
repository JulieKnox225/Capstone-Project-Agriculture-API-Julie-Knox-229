const jwt = require('jsonwebtoken');
require('dotenv').config();

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    // const token = req.cookies['accessToken'];

    if(token == null) {
        return res.status(401).send({success: false, message: 'No token!', data: null});
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,  user) => {
        if(err) {
            return res.status(403).send({success: false, message: 'Wrong Password', data: null});
        }

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;