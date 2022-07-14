const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const databaseConnection = await mongoose.connect(process.env.DB_STRING);

    console.log(`Database connected: ${databaseConnection.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = connectDB;
