const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middleware/authenticateMiddle');

router.use(express.json());

router.get('/plants', async (req, res) => {
    try {
        const result = await req.db.query(`SELECT * FROM plants`);

        res.status(200).send(result[0]);
    } catch (err) {
        res.status(400).send({success: false, message: err, data: null});
    }
});

router.post('/plants', async (req, res) => {
    try {
        const { name, nickname, tempRangeHigh, tempRangeLow, sowTemp, fertilizerNPK, companionPlantId, description } = req.body;
        // const userResult = await req.db.query(
        //     `SELECT id FROM users
        //         WHERE name = :user`,
        //     {
        //         user: req.user
        //     }
        // );
        // const { id } = userResult[0][0];

        await req.db.query(
            `INSERT INTO plants (name, nickname, temp_range_high, temp_range_low, sow_temp, fertilizer_NPK, companion_plant_id, description, user_id)
                VALUES (:name, :nickname, :tempRangeHigh, :tempRangeLow, :sowTemp, :fertilizerNPK, :companionPlantId, :description, 0)`,
            {
                name, nickname, tempRangeHigh, tempRangeLow, sowTemp, fertilizerNPK, companionPlantId, description
            }
        );


        res.status(200).send({success: true, message: `Entry added!`, data: null});
    } catch (err) {
        res.status(400).send({success: false, message: err, data: null});
    }
})

module.exports = router;