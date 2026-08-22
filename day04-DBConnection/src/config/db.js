let mongoose = require("mongoose");

let ConnectDB = async () => {
    try {
        await mongoose.connect(
          "mongodb+srv://rathodmitesh881_db_user:mitesh%40123@cluster0.dxjxfnw.mongodb.net/",
        );

        console.log("MongoDB Connect");
        
    } catch (error) {
        console.log("error in DB", error);
        
    }
}

module.exports = ConnectDB