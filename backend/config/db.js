const mongoose = require("mongoose");

const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("mongoDb Connected Successfully");
  } catch (error) {
    console.log(`error connect with mongodb ${error.message}`);
    process.exit(1);
  }
};

module.exports = ConnectDb;
