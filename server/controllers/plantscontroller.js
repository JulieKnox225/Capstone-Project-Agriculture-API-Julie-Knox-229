const getPlants = async (req, res) => {
    try {
        const { search, type } = req.query;
        let result = [];
        if(search) {
            switch (type) {
                case 'name':
                    result = await req.db.query(`SELECT * FROM plants WHERE name LIKE '%${search}%'`);
                    break;
                case 'nickname':
                    result = await req.db.query(`SELECT * FROM plants WHERE nickname LIKE '%${search}%'`);
                    break;
                case 'months_to_plant':
                    result = await req.db.query(`SELECT * FROM plants WHERE months_to_plant LIKE '%${search}%'`);
                    break;
                case 'sun_req':
                    result = await req.db.query(`SELECT * FROM plants WHERE sun_req = :search`, { search });
                    break;
                case 'planting_zone':
                    result = await req.db.query(`SELECT * FROM plants WHERE planting_zone = :search`, { search });
                    break;
                case 'sow_temp_range':
                    result = await req.db.query(`SELECT * FROM plants WHERE sow_temp_range LIKE '%${search}%'`);
                    break;
                case 'fertilizer_NPK':
                    result = await req.db.query(`SELECT * FROM plants WHERE fertilizer_NPK = :search`, { search });
                    break;
                case 'description':
                    result = await req.db.query(`SELECT * FROM plants WHERE description LIKE '%${search}%'`);
                    break;
                default:
                    result = await req.db.query(`SELECT * FROM plants WHERE :type = :search`, { type, search });
                    break;
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
};

module.exports = {
    getPlants,
    createPlant,
    getSavedPlants
}