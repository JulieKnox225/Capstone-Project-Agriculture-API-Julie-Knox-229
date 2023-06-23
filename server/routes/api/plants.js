const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middleware/authenticateMiddle');
const { getPlants, createPlant, getSavedPlants, addSavedPlant, removeSavedPlant } = require('../../controllers/plantsController');

router
    .use(express.json())
    .get('/plants', getPlants)
    .post('/plants', authenticateToken, createPlant)
    .post('/plants', authenticateToken, createPlant)
    .get('/saved', authenticateToken, getSavedPlants)
    .post('/saved', authenticateToken, addSavedPlant)
    .delete('/saved', authenticateToken, removeSavedPlant);

module.exports = router;