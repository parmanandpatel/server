
import mongoose  from "mongoose";
const dev = require("./dev.config.json");
exports.connectMyDb = () => {
    // mongoose.set('strictQuery', true);
    mongoose.connect(
      dev.DB_CONNECT,
      { useUnifiedTopology: true, useNewUrlParser: true },
      () => console.log("connected to db")
    );

}