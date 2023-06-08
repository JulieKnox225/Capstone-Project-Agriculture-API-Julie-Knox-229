const jwt = require('jsonwebtoken');
require('dotenv').config();

async function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];

        if(authHeader == null) {
            return res.status(401).send({success: false, message: 'No token!', data: null});
        }

        const token = authHeader.split(' ')[1];
        // const token = req.cookies['accessToken'];

        if(token == null) {
            return res.status(401).send({success: false, message: 'No token!', data: null});
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,  user) => {
            if(err) {
                console.log(err)
                return res.status(403).send({success: false, message: err, data: null});
            }

            req.user = user;
            req.token = true;
            next();
        });
    } catch (error) {
        console.log(error)
        return res.status(403).send({success: false, message: error, data: null});
    
    }
    
}

module.exports = authenticateToken;