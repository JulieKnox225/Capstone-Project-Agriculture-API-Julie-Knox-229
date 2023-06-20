require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    try {
        const { name, password } = req.body;

        const hashed_password = await bcrypt.hash(password, 10);
        
        await req.db.query(
            `INSERT INTO users (name, password)
                VALUES (:name, :hashed_password)`,
            {
                name,
                hashed_password
            }
        );

        res.status(200).send({success: true, message: 'User Created!', data: null});
    } catch (err) {
        res.status(400).send({success: false, message: err, data: null});
    }
};

const login = async (req, res) => {
    try {
        const { name, password: sentPassword } = req.body;

        const result = await req.db.query(
            `SELECT password FROM users
                WHERE name = :name`,
            {
                name
            }
        );

        if(result[0].length === 0) {
            return res.status(400).json({success: false, message: 'No user found!', data: null});
        }

        const { password: hashedPassword } = result[0][0];

        if(await bcrypt.compare(sentPassword, hashedPassword)) {
            const accessToken = jwt.sign({name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'});
            const refreshToken = jwt.sign({name}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1w'});

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
            });

            res.status(200).json({success: true, message: 'Logged In!', data: accessToken});
        } else {
            return res.status(400).json({success: false, message: 'Wrong password!', data: null});
        }

    } catch (err) {
        res.status(400).json({success: false, message: err, data: null});
    }
};

const refresh = (req, res) => {
    try {
        const refreshToken = req.cookies['refreshToken'];

        if(!refreshToken){
            return res.status(401).send({success: false, message: `No token.`, data: null});
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,  user) => {
            if(err || !user.name) {
                return res.status(403).send({success: false, message: err || 'JWT error!', data: null});
            }
            
            const accessToken = jwt.sign({name: user.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'});
            res.status(200).send({success: false, message: 'Refreshed', data: accessToken});
        });

    } catch (error) {
        res.status(400).send({success: false, message: error, data: null});
    }
}

module.exports = {
    createUser,
    login,
    refresh
}