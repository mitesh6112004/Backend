let mongoose = require("mongoose");

let ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoDB);

        console.log("MongoDB Connect");
        
    } catch (error) {
        console.log("error in DB", error);
        
    }
}

module.exports = ConnectDB