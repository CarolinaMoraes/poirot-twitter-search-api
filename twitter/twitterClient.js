module.exports = {
    provideClient() {
        require('dotenv').config();
        const Twit = require('twit');
        const T = new Twit({
            consumer_key: process.env.consumer_key,
            consumer_secret: process.env.consumer_secret,
            access_token: process.env.access_token,
            access_token_secret: process.env.access_token_secret,
        })
        return T;
    }
}