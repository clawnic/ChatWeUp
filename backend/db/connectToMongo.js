const mongoose = require('mongoose');

const connectToMongo = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    }catch(e){
        console.log("Error connecting to Mongo DB:",e.message);
    }
}

module.exports = connectToMongo;