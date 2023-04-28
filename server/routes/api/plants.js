const express = require('express');
const router = express.Router();

// router.use(express.json());

router.get('/plants', async (req, res) => {
    try {
        const result = await req.db.query(`SELECT * FROM plants`);

        res.status(200).send(result[0]);
    } catch (err) {
        res.json({success: false, message: err, data: null});
    }
});


module.exports = router;