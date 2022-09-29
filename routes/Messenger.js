const Router = require("express").Router();
const {
	AddViecle,
	Viecles,
	Trailers,
	TrailerType,
	AddTrailerType,
	AddTrailers,
} = require("../controllers/viecles");
Router.post("/", AddViecle);
Router.get("/", Viecles);
Router.post("/AddTrailer", AddTrailers);
Router.get("/Trailers", Trailers);
Router.post("/AddTrailerType", AddTrailerType);
Router.get("/TrailerTypes", TrailerType);

module.exports = Router;
