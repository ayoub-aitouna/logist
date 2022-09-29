const Router = require("express").Router();
const { ChatRoms, Chat, Read, Send } = require("../controllers/Messenger");

Router.get("/inbox", ChatRoms);
Router.get("/Chat", Chat);
Router.post("/Read", Read);
Router.post("/Send", Send);

module.exports = Router;
