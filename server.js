const express = require('express');
const app = express();
const Log = require('./log/index');

//  routers
const Auth = require('./routes/Auth');
const User = require('./routes/Users');
const Viecle = require('./routes/Viecles');
const Order = require('./routes/order');
// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(express.static('./public'));


app.use('/api/v1/auth', Auth);
app.use('/api/v1/user', User);
app.use('/api/v1/order', Order);
app.use('/api/v1/review', () => {});
app.use('/api/v1/viecles', Viecle);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const PORT = process.env.PORT || 8000;
const start = () => {
    try {
        app.listen(PORT, () => {
            Log.info(`App Running on port => ${PORT}`)
        })
    } catch (error) {
        Log.error(`App Stopped by an Error => ${error}`)
    }
}


start();