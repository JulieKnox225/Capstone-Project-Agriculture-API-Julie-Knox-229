const getPlants = async (req, res) => {
    try {
        const { search, type } = req.query;
        const wordsToSearchWithLike = ['name', 'nickname', 'months_to_plant', 'sow_temp_range', 'description', 'planting_zone'];
        let result = [];
        if(search) {
            if(wordsToSearchWithLike.includes(type)) {
                result = await req.db.query(`SELECT * FROM plants WHERE ${type} LIKE '%${search}%'`);
            } else {
                result = await req.db.query(`SELECT * FROM plants WHERE ${type} = :search`, { search });
            }
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
};

const createPlant = async (req, res) => {
    try {
        
        const { name, nickname, monthsToPlant, sunReq, plantingZone, sowTemp, fertilizerNPK, companionPlantId, description, avoidPlantId } = req.body;
       
        const userResult = await req.db.query(
            `SELECT id FROM users
                WHERE name = :user`,
            {
                user: req.user
            }
        );
        const { id } = userResult[0][0];

        await req.db.query(
            `INSERT INTO plants (name, nickname, months_to_plant, sun_req, planting_zone, sow_temp_range, fertilizer_NPK, companion_plant_id, description, avoid_plant_id, user_id)
                VALUES (:name, :nickname, :monthsToPlant, :sunReq, :plantingZone, :sowTemp, :fertilizerNPK, :companionPlantId, :description, :avoidPlantId, :id)`,
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
                avoidPlantId: avoidPlantId === '' ? null : parseInt(avoidPlantId),
                id
            }
        );

        res.status(200).send({success: true, message: `Entry added!`, data: null});
    } catch (err) {
        res.status(400).send({success: false, message: err, data: null});
    }
};

const getSavedPlants = async (req, res) => {
    try {
        const id = await req.db.query(
            `SELECT id FROM users WHERE name = :name`,
            {
                name: req.user
            }
        );

        const result = await req.db.query(
            `SELECT * FROM saved_list WHERE user_id = :userId`,
            {
                userId: id[0][0].id
            }
        );

        res.status(200).send(result[0]);
    } catch (err) {
        res.status(400).send({success: false, message: err, data: null});
    }
};

const addSavedPlant = async (req, res) => {
    try {
        const { plantId } = req.params;
        const id = await req.db.query(
            `SELECT id FROM users WHERE name = :name`,
            {
                name: req.user
            }
        );

        await req.db.query(
            `INSERT INTO saved_list (user_id, plant_id)
                VALUES (:id, :plantId)`,
            {
                id: id[0][0].id,
                plantId

            }
        );

        res.status(200).send({success: true, message: 'Saved plant!', data: null});
    } catch (error) {
        res.status(400).send({success: false, message: err || 'Unknown error occurred', data: null});
    }
};

const removeSavedPlant = async (req, res) => {
    try {
        const { plantId } = req.params;

        const id = await req.db.query(
            `SELECT id FROM users WHERE name = :name`,
            {
                name: req.user
            }
        );

        await req.db.query(
            `DELETE FROM saved_list 
                WHERE user_id = :id AND plant_id = :plantId`,
            {
                id: id[0][0].id,
                plantId
            }
        );

        res.status(200).send({success: true, message: 'Removed saved plant!', data: null});
    } catch (error) {
        res.status(400).send({success: false, message: err || 'Unknown error occurred', data: null});
    }
}

module.exports = {
    getPlants,
    createPlant,
    getSavedPlants,
    addSavedPlant,
    removeSavedPlant
}