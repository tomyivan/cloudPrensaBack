const BoxSDK = require('box-node-sdk');
const  http = require( 'http');
require('dotenv').config()

const Box = (boxToken)=> {
    var sdk = new BoxSDK({
        clientID: process.env.BOX_CLIENT_ID,
        clientSecret: process.env.BOX_CLIENT_SECRET
    });    
    return sdk.getBasicClient(process.env.BOX_TOKEN);
}

module.exports = {
    Box
}
