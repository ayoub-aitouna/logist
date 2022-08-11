const express = require('express');
const app = express();
const Log = require('./log/index');
const { client } = require('./database/index')
const http = require("http");
/** Create HTTP server. */
const server = http.createServer(app);
const socketio = require("socket.io")(server);

// socket configuration
const WebSockets = require("./utils/WebSockets.js");

//  routers
const Auth = require('./routes/Auth');
const User = require('./routes/Users');
const Viecle = require('./routes/Viecles');
const Order = require('./routes/order');
const review = require('./routes/review');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticationMiddleware = require('./middleware/Auth/auth');

app.use(express.json());
app.use(express.static('./public'));
client.connect();

app.use('/api/v1/auth', Auth);
app.use('/api/v1/user', authenticationMiddleware, User);
app.use('/api/v1/order', authenticationMiddleware, Order);
app.use('/api/v1/review', authenticationMiddleware, review);
app.use('/api/v1/viecles', Viecle);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const PORT = process.env.PORT || 8000;


/** Create socket connection */
let app_server;
global.io = socketio.listen(server);
global.io.on('connection', WebSockets.connection);

const start = () => {
    try {
        app_server = app.listen(PORT, () => {
            Log.info(`App Running on port => ${PORT}`)
        })
    } catch (error) {
        Log.error(`App Stopped by an Error => ${error}`)
    }
}


start();
module.exports = app_server;