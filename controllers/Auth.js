const { Mysql } = require('../database/index.js')
const jwt = require("jsonwebtoken");
const { Redis } = require('../database/index.js')
const client = Redis();
require('dotenv').config()
const Log = require('../log')
const { sendMessage, generateKeyAndstoreOtp } = require('../Utils/OTP')
const { GenrateAvaratByName } = require('../Utils/Avatar')


const processFile = require("../middleware/upload");
const { format } = require("util");
const { Storage } = require("@google-cloud/storage");
// Instantiate a storage client with credentials
const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("bezkoder-e-commerce");

/**
 * @description check if user already has an account if so generate a key and send otp to verify && return {aleady = true } if dosnt return  {aleady = false }
 */
const CheckIfUserExists = async(req, res) => {
    const { phonenumber } = req.params;
    if (!phonenumber) {
        throw new BadRequestError('Please provide phonenumber')
    }
    const Key = await generateKeyAndstoreOtp(phonenumber);

    const user = await Mysql.query("select * from user_table where phone_number = ?", [phonenumber]);
    try {
        await sendMessage(Key, phonenumber)
        res.json({ already: !user ? false : true })
    } catch (err) {
        res.sendStatus(500);
    }

}

const login = async(req, res) => {
    const { phonenumber, key } = req.body;
    //get key from redis
    const StoredKey = await client.get(phonenumber);
    Log.info(`Verify User by Key ==> ${key}`);
    if (key != null && key != undefined && key == StoredKey) {
        try {
            const user = await Mysql.query("select * from user_table where phone_number = ?", [phonenumber]);
            if (user == false) {
                res.json({ Verified: true });
            } else {
                const accesToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                const RefreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
                res.json({ accesToken: accesToken, RefreshToken: RefreshToken, Verified: true });
            }

        } catch (err) {
            res.json({ Verified: false });
        }

    } else {
        res.json({ Verified: false });

    }

}

const VerifyNumber = async(req, res) => {
    const { phonenumber, key } = req.body;
    //get key from redis
    const value = await client.get(phonenumber);
    res.json({ Verified: (value != null && value != undefined && value == key) });

}

const regester = async(req, res) => {
    const { FullName, phoneNumber, adrress } = req.body;

    let avatar_img_path = await GenrateAvaratByName(user.FullName);
    if (!avatar_img_path) throw new UnauthenticatedError('Failled To Generate Profile Avatar')

    const UserCreated = await Mysql.query(
        `insert into user_table(avatar,full_name,phone_number,gender,birth_date,adrress,email,created_date)values(?,?,?,?,?,?,?,CURRENT_DATE());` [
            avatar_img_path, FullName, phoneNumber, gender, birthDate, adrress, email
        ]);
    if (!UserCreated) throw UnauthenticatedError('User Could not be Created')

    const accesToken = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET);
    const RefreshToken = jwt.sign(req.body, process.env.REFRESH_TOKEN_SECRET);

    res.json({ accesToken: accesToken, RefreshToken: RefreshToken });
}

const driverRegester = async(req, res) => {
    const {
        FullName,
        phoneNumber,
        adrress,
        nationality,
        identity_card,
        license,
        vehicle_register_number,
        plate_number,
        identity_card_photo_front,
        identity_card_photo_back,
        lecense_photo,
        vehicle_type_id
    } = req.body;

    let avatar_img_path = await GenrateAvaratByName(user.FullName);
    if (!avatar_img_path) throw new UnauthenticatedError('Failled To Generate Profile Avatar')

    const UserCreated = await Mysql.query(
        `insert into user_table(avatar,full_name,phone_number,gender,birth_date,adrress,email,created_date)values(?,?,?,?,?,?,?,CURRENT_DATE());` [
            avatar_img_path, FullName, phoneNumber, gender, birthDate, adrress, email
        ]);

    if (!UserCreated) throw UnauthenticatedError('User Could not be Created');

    const DriverCreated = Mysql.query(`INSERT INTO driver(user_id ,nationality ,identity_card ,license ,vehicle_register_number, plate_number, identity_card_photo_front, identity_card_photo_back, lecense_photo, vehicle_type_id) 
                                        VALUES(?,?,?,?,?,?,?,?,?,?);`, [UserCreated[0].id, nationality, identity_card, license, vehicle_register_number, plate_number, identity_card_photo_front, identity_card_photo_back, lecense_photo, vehicle_type_id]);

    if (!DriverCreated) throw UnauthenticatedError('Driver Could not be Created');

    const accesToken = jwt.sign(DriverCreated[0], process.env.ACCESS_TOKEN_SECRET);
    const RefreshToken = jwt.sign(DriverCreated[0], process.env.REFRESH_TOKEN_SECRET);

    res.json({ accesToken: accesToken, RefreshToken: RefreshToken });
}

const UploadDocument = async(req, res) => {
    try {
        await processFile(req, res);
        if (!req.file) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        try {
            const URl = await UploadFile(req.file.originalname);
        } catch (error) {
            res.status(500).send({ message: error.message, url: error.url })
        }
        // Create a new blob in the bucket and upload the file data.

    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};

const ResendOTP = async(req, res) => {
    const { phonenumber } = req.body;

    const Key = await client.get(phonenumber);
    if (Key == null || Key == undefined) res.sendStatus(404);
    try {
        await sendMessage(Key, phonenumber)
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500);
    }
}

async function UploadFile(file) {
    return new Promise((res, rej) => {
        const blob = bucket.file(file);
        const blobStream = blob.createWriteStream({
            resumable: false,
        });
        blobStream.on("error", (err) => {
            rej({ message: err.message })

        });
        blobStream.on("finish", async(data) => {
            // Create URL for directly file access via HTTP.
            const publicUrl = format(
                `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );
            try {
                // Make the file public
                await bucket.file(req.file.originalname).makePublic();
            } catch {
                rej({
                    message: `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
                    url: publicUrl,
                })

            }
            res({
                message: "Uploaded the file successfully: " + req.file.originalname,
                url: publicUrl,
            })

        });
        blobStream.end(req.file.buffer);
    })

}

module.exports = {
    CheckIfUserExists,
    login,
    VerifyNumber,
    regester,
    ResendOTP,
    UploadDocument,
    driverRegester
}