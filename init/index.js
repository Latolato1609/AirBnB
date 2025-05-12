const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data.js");

main()
    .then(() => console.log("connected to db"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');

}

const initDb = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "67346ffe219922f872f01cc7" }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDb();