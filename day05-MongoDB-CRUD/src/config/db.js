const mongoose = require("mongoose");

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoDB_uri);
        console.log("MongoDB is Connected");
        
    } catch (error) {
        console.log("Database Error is ", error);
        
    }
}

module.exports = ConnectDB ; 

