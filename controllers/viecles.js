const { Mysql, SqlQuery } = require("../database/index.js");
const { BadRequestError } = require("../errors");
const Log = require("../log");

const AddViecle = async (req, res) => {
	const { _name, _dec, _pic } = req.body;
	try {
		const vehicle = SqlQuery(`Select * from vehicle where _name =  ${_name}`);
		if (!vehicle.SqlQuery) {
			const Added = SqlQuery(
				`Insert into vehicle(_name, _dec, _pic) values ('${_name}, ${_dec}, ${_pic}')`
			);
		}
		res.status(200).send("OK");
	} catch (err) {
		throw new BadRequestError(`could not add vehicle by the id => ${id}`);
	}
};

const Viecles = async (req, res) => {
	try {
		const Viecles = SqlQuery("Select * from vehicle");
		res.json(Viecles);
	} catch (err) {
		throw new BadRequestError("Could not Retrive Your Request");
	}
};

const Trailers = async (req, res) => {
	try {
		const trailler = SqlQuery(`Select * from trailler where _name =  ${_name}`);
		res.json(trailler);
	} catch (err) {
		throw new BadRequestError("Could not Retrive Your Request");
	}
};

const AddTrailers = async (req, res) => {
	const { _name, _dec, _pic } = req.body;
	try {
		const trailler = SqlQuery(`Select * from trailler where _name =  ${_name}`);
		if (!trailler.SqlQuery) {
			const Added = SqlQuery(
				`Insert into trailler(_name, _dec, _pic) values ('${_name}, ${_dec}, ${_pic}')`
			);
		}
		res.status(200).send("OK");
	} catch (err) {
		throw new BadRequestError(`could not add vehicle by the id => ${id}`);
	}
};

const TrailerType = async (req, res) => {
	try {
		const trailler_types = SqlQuery(
			`Select * from trailler_types where _name =  ${_name}`
		);
		res.json(trailler_types);
	} catch (err) {
		throw new BadRequestError("Could not Retrive Your Request");
	}
};

const AddTrailerType = async (req, res) => {
	const { _name, _dec, _pic } = req.body;
	try {
		const trailler_types = SqlQuery(
			`Select * from trailler_types where _name =  ${_name}`
		);
		if (!trailler_types.SqlQuery) {
			const Added = SqlQuery(
				`Insert into trailler_types(_name, _dec, _pic) values ('${_name}, ${_dec}, ${_pic}')`
			);
		}
		res.status(200).send("OK");
	} catch (err) {
		throw new BadRequestError(
			`could not add trailler_types by the id => ${id}`
		);
	}
};
module.exports = {
	AddViecle,
	Viecles,
	Trailers,
	TrailerType,
	AddTrailerType,
	AddTrailers,
};
