require ('dotenv').config();
const url = process.env.DB_URL;
const mongoose = require('mongoose');

main().catch(err => console.log(err));


async function main() {
    await mongoose.connect(url);
};

let db = mongoose.connection;

db.on('connected', () => {
    console.log("MongoDB connected successfully");
})

db.on('error', () => {
    console.log("MongoDB connected failed");
})

module.exports = db;


