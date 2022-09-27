const { Mysql, Query } = require('../database/index.js')
const Log = require('../log')
const { sendMessage, generateKeyAndstoreOtp } = require('../Utils/OTP')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const { GetUserById } = require('../Utils/user')
const { client } = require('../database')


const GetUser = async(req, res) => {
    const { id: UserId } = req.user;
    const user = Query("select * from user_table where id = " + UserId);
    if (!user) return res.status(404).send("User not found");
    if (user.length === 0) {
        return res.status(200).send({
            id: 0,
            full_name: "",
            phone_number: ""
        });
    }
    res.status(200).send(JSON.stringify(user[0]));
}

const GetUsers = async(req, res) => {
    const users = Query(`select * from user_table`);
    res.status(200).send(users);
}
const Orders = async(req, res) => {
    const { id: UserId } = req.user;

    const Orders = Query(`select OrderTable.*, driver.id ,user_table.full_name as 'Driver Name'
    ,l_Distination.latitude as 'Distination_lat' ,  l_Distination.longitude as "Distination_long"
    ,l_location.latitude as 'location_lat' ,  l_location.longitude as "location_long"
    ,l_Current_Location.latitude as 'Current_Location.lat' ,  l_Current_Location.longitude as "Current_Location_long"
            from OrderTable 
            inner join location l_Distination on (l_Distination.id = OrderTable.Distination)
            inner join location l_location on (l_location.id = OrderTable.location)
            inner join location l_Current_Location on (l_Current_Location.id = OrderTable.Current_Location)
            inner join driver  on (driver.id = OrderTable.Driver_ID)
            inner join user_table  on (user_table.id = driver.user_id)
            where OrderTable.user_id = ${UserId}`);

    res.status(200).send(Orders);
}

const UpdateUser = async(req, res) => {
    const { id: UserId } = req.user;
    const user = await GetUserById(UserId);
    const updateRes = Query(`update user_table set full_name =${user.full_name} , adrress=${user.adress} ,email=${user.email}`);
    res.sendStatus(200)
}

const UpdatePhoneNumber = async(req, res) => {
    const { phonenumber, Otp } = req.body;
    const Stored_Otp = await client.get(phonenumber);
    if (Stored_Otp !== Otp) throw new BadRequestError('Entred otp not valide')
    const user = Query(`update user_table set phone_number = ${phonenumber}`);
    res.status(200).send(user);
}

const SendOtp = async(req, res) => {
    const { id } = req.user;
    const user = await GetUserById(id);
    try {
        sendMessage(generateKeyAndstoreOtp(user.phone_number), user.phone_number);
        res.sendStatus(200);
    } catch (err) {
        throw new BadRequestError(err);
    }
}

module.exports = { GetUser, GetUsers, UpdateUser, UpdatePhoneNumber, SendOtp, Orders }