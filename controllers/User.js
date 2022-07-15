const { Mysql } = require('../database/index.js')
const Log = require('../log')
const { sendMessage, generateKeyAndstoreOtp } = require('../Utils/OTP')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const { GetUserById } = require('../Utils/user')
const { Redis } = require('../database')
const client = await Redis();


const GetUser = (req, res) => {
    const { id: UserID } = req.params;
    const user = await Mysql.query("select * from users where id = ?", [UserID]);
    if (!user) return res.status(404).send("User not found");
    res.status(200).send(user);

}
const GetUsers = (req, res) => {
    const user = await Mysql.query("select * from users where");
    if (!user) return res.status(404).send("Empty");
    res.status(200).send(user);

}

const UpdateUser = (req, res) => {
    const { id: UserID } = req.user;

    const user = await GetUserById(UserID);
    const updateRes = await Mysql.query("update users set full_name =? , adrress=?,email=?", [user.full_name, user.adress, user.email]);
    if (!updateRes) return res.status(404).send("User not found");
    res.sendStatus(200)
}

const UpdatePhoneNumber = (req, res) => {
    const { phonenumber, Otp: inputOtp } = req.body;
    const Otp = await client.get(phonenumber);
    if (inputOtp !== Otp) throw new UnauthenticatedError('Entred otp not valide')

    const user = await Mysql.query("update users set phone_number=?", [phonenumber]);
    res.status(200).send(user);
}
const SendOtp = (req, res) => {
    const { id: UserID } = req.user;
    const user = await GetUserById(UserID);
    sendMessage(user.phone_number)
}

module.exports = { GetUser, GetUsers, UpdateUser, UpdatePhoneNumber }