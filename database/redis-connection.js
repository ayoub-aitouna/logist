const redis = require('redis');
const Log = require('../log')
const client = redis.createClient();
client.on('connect', function(err) {
    if (err) {
        Log.error("Error occured while connecting to redis server")
    } else {
        Log.info('connected to Redis!!');
    }
});
client.on('error', function(err) {
    if (err) {
        Log.error(err);
    }
});

async function disconnectRedis() {
    await new Promise((resolve, reject) => {
        client.quit(() => {
            resolve();
        });
    });
}
module.exports = {
    client,
    disconnectRedis
};