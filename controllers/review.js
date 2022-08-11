const { Mysql } = require('../database/index.js');
const { BadRequestError } = require('../errors');
const Log = require('../log');


const AddReview = async(req, res) => {
    const { id: UserId } = req.user;
    const { id: DriverId, Rating } = req.body;
    try {
        const Review = await Mysql(`INSERT into Reviews(driver_id , user_id , Rating, review_date)VALUES(?,?,?,CURDATE());`, [DriverId, UserId, Rating]);
        res.status(200).send("OK");
    } catch (err) {
        throw new BadRequestError(`could not add vehicle by the name => ${vehicle_type_name}`)
    }

}

const Reviews = async(req, res) => {
    const { id: DriverId } = req.body;
    try {
        const Review = await Mysql("Select * from Reviews where driver_id = ?", [DriverId]);
        res.json(Review);
    } catch (err) {
        throw new BadRequestError('Could not Retrive Your Request');
    }
}

module.exports = { AddReview, Reviews };