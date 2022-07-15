const { Mysql } = require('../database/index.js');
const { BadRequestError } = require('../errors');
const Log = require('../log');


const AddReview = async(req, res) => {
    const { vehicle_type_name } = req.body;
    try {
        const vehicle_type = await Mysql("Select * from vehicle_type where vehicle_type_name =? ", [vehicle_type_name]);
        if (!vehicle_type) {
            const Added = await Mysql("Insert into vehicle_type(vehicle_type_name)values ")
        }
        res.status(200).send("OK");
    } catch (err) {
        throw BadRequestError(`could not add vehicle by the name => ${vehicle_type_name}`)
    }

}

const Reviews = async(req, res) => {
    try {
        const Viecles = await Mysql("Select * from vehicle_type");
        res.json(Viecles);
    } catch (err) {
        throw BadRequestError('Could not Retrive Your Request');
    }
}

//const GetMostRiviewd

module.exports = { AddReview, Reviews };