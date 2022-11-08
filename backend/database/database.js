const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
    mongoose
        .connect(MONGO_URI)
        .then(() => console.log("Connected to database succesfuly"))
        .catch((e) => {
            console.log("Failed to connect to the database");
            console.log(e);
            process.exit(1);
        });
};