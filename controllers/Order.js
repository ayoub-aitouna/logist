const Mysql = require('express');
const { BadRequestError } = require('../errors');

const Order = async(req, res) => {
    const { id: UserID } = req.params;
    const {
        Driver_ID,
        Date_of_Order,
        Distination,
        location,
        viecle_Id,
        trailer_id,
        Current_Location,
        Order_Type,
        Order_Complited,
        Order_Start_Time
    } = req.body;
    try {
        const order = await Mysql(`insert into table OrderTable(Driver_ID, user_id, Date_of_Order, Distination, location, Accepted,
            Canceled, viecle_Id, trailer_id, Current_Location, Order_Type,Order_Complited,
            Order_Start_Time) values(?,?,?,?,?,false,false,?,?,?,?);`, [Driver_ID, id, Date_of_Order, Distination, location,
            viecle_Id, trailer_id, Current_Location, Order_Type, Order_Complited, Order_Start_Time
        ]);
        if (order) throw BadRequestError("Could not Place The order");
        res.status(200).send("OK");
    } catch (err) {
        throw BadRequestError("Could not Place The order");
    }
}

const AcceptOrder = async(req, res) => {
    const { id } = req.body;
    try {
        const updated = await Mysql("update OrderTable set Accepted = true where id = ? ", [id]);
        res.status(200).send('ok');
    } catch (err) {
        throw BadRequestError("could not Accept The Order");
    }
}

const CancelOrder = async(req, res) => {
    const { id } = req.body;
    try {
        const updated = await Mysql("update OrderTable set Canceled = true where id = ? ", [id]);
        res.status(200).send('ok');
    } catch (err) {
        throw BadRequestError("could not Accept The Order");
    }
}

const CompleteOrder = async(req, res) => {
    const { id } = req.body;
    try {
        const updated = await Mysql("update OrderTable set Order_Complited = true where id = ? ", [id]);
        res.status(200).send('ok');
    } catch (err) {
        throw BadRequestError("could not Accept The Order");
    }
}

const UpdateLocation = async(req, res) => {
    const { location } = req.body;
    try {
        const updated = await Mysql("update OrderTable set location = ? where id = ? ", [location, id]);
        res.status(200).send('ok');
    } catch (err) {
        throw BadRequestError("could not Accept The Order");
    }
}