require('dotenv').config();
const jwt = require('jsonwebtoken');

async function authenticateToken(req, res, next) {
    try {
        let authHeader = req.headers['authorization'];

        if(!authHeader) {
            authHeader = req.headers['Authorization'];

            if(!authHeader) {
                return res.status(401).send({success: false, message: 'No token! - auth', data: null});
            }
        }

        const token = authHeader.split(' ')[1];

        if(!token) {
            return res.status(401).send({success: false, message: 'No token!', data: null});
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,  user) => {
            if(err || !user.name) {
                return res.status(403).send({success: false, message: err, data: null});
            }

            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(403).send({success: false, message: 'auth middle', data: null});
    }
    
}

module.exports = authenticateToken;