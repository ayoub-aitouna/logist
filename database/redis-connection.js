const createClient = require('redis');
const Log = require('../log')
    // const client = createClient.createClient({
    //     url: 'redis://:p3f20e7666f09aa032b22841127ec39fe73a5dbaac6d3911342bfe37b95421bc6@ec2-54-78-213-175.eu-west-1.compute.amazonaws.com:17649'
    // });


const ConnectRedis = async() => {
    const client = createClient.createClient();
    try {
        client.on('error', (err) => Log.error(`redis client err => ${err}`));
        return await client.connect();
    } catch (err) {
        Log.error(`redis client err => ${err}`)
    }
}

module.exports = ConnectRedis;