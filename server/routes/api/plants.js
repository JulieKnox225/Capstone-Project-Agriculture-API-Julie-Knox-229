const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middleware/authenticateMiddle');
const { getPlants, createPlant, getSavedPlants } = require('../../controllers/plantsController');

router
    .use(express.json())
    .get('/plants', authenticateToken, getPlants)
    .post('/plants', authenticateToken, createPlant)
    .post('/plants', authenticateToken, createPlant)
    .get('/saved', authenticateToken, getSavedPlants);

module.exports = router;