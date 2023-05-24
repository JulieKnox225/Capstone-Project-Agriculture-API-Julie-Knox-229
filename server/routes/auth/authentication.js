const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.use(express.json());

router.post('/user', async (req, res) => {
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
});

router.post('/login', async (req, res) => {
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
            const accessToken = jwt.sign(name, process.env.ACCESS_TOKEN_SECRET);
            res.status(200).send(accessToken);
            //{success: true, message: 'Logged In!', accessToken, data: null}
        }

    } catch (err) {
        res.status(400).json({success: false, message: err, data: null});
    }
});

module.exports = router;