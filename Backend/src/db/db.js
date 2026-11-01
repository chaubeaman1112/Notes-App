const mongoose= require('mongoose');

async function connectDB(){
    mongoose.connect(process.env.mongo_uri);
    console.log("database connected here")

}

module.exports= connectDB;