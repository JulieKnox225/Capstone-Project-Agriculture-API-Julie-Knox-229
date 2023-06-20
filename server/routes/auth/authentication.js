const express = require('express');
const router = express.Router();
const { createUser, login, refresh } = require('../../controllers/authControllers');

router
    .use(express.json())
    .post('/user', createUser)
    .post('/login', login)
    .get('/refresh', refresh);

module.exports = router;