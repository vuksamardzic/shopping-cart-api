const mongoose = require('mongoose');
const {db} = require('./config');


mongoose.Promise = global.Promise;

const connect = async () => {
    try {
        const conn = await mongoose.connect(db.url, db.options);
        if (conn) {
            console.log(`db connected on port #${conn.connections[0].port}`);
        }
    } catch (e) {
        console.log(e);
    }
};

module.exports = connect;
