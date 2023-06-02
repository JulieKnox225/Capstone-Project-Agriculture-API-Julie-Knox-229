const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middleware/authenticateMiddle');

router.use(express.json());

router.get('/plants', authenticateToken, async (req, res) => {
    try {
        const { search } = req.query;
        let result = [];
        if(search) {
            result = await req.db.query(`SELECT * FROM plants WHERE name = :search`, { search });
        }
        else {
            result = await req.db.query(`SELECT * FROM plants`);
        }

        if(result[0].length === 0) {
            result[0].push({ name: 'Sorry none found!' });
        }

        res.status(200).json(result[0]);
    } catch (err) {
        res.status(400).send({success: false, message: err, data: null});
    }
});

router.post('/plants', async (req, res) => {
    try {
        
        const { name, nickname, monthsToPlant, sunReq, plantingZone, sowTemp, fertilizerNPK, companionPlantId, description, avoidPlantId } = req.body;
       
       //   TO BE ADDED ALONG WITH AUTH
        // const userResult = await req.db.query(
        //     `SELECT id FROM users
        //         WHERE name = :user`,
        //     {
        //         user: req.user
        //     }
        // );
        // const { id } = userResult[0][0];

        await req.db.query(
            `INSERT INTO plants (name, nickname, months_to_plant, sun_req, planting_zone, sow_temp_range, fertilizer_NPK, companion_plant_id, description, avoid_plant_id, user_id)
                VALUES (:name, :nickname, :monthsToPlant, :sunReq, :plantingZone, :sowTemp, :fertilizerNPK, :companionPlantId, :description, :avoidPlantId, 0)`,
            {
                name, 
                nickname, 
                monthsToPlant, 
                sunReq,
                plantingZone, 
                sowTemp, 
                fertilizerNPK, 
                companionPlantId: companionPlantId === '' ? null : parseInt(companionPlantId), 
                description, 
                avoidPlantId: avoidPlantId === '' ? null : parseInt(avoidPlantId)
            }
        );

        res.status(200).send({success: true, message: `Entry added!`, data: null});
    } catch (err) {
        res.status(400).send({success: false, message: err, data: null});
    }
});

router.get('/saved', authenticateToken, async (req, res) => {
    try {
        const idResult = await req.db.query(
            `SELECT id FROM users WHERE name = :name`,
            {
                name: req.user
            }
        );

        const result = await req.db.query(
            `SELECT * FROM plants WHERE user_id = :userId`,
            {
                userId: idResult[0][0].id
            }
        );

        res.status(200).send(result[0]);
    } catch (err) {
        res.status(400).send({success: false, message: err, data: null});
    }
})

module.exports = router;