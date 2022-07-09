const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // We try to make a connection to the database
    const databaseConnection = await mongoose.connect(process.env.DB_STRING);

    console.log(`Database connected: ${databaseConnection.connection.host}`);
  } catch (error) {
    // If there is an error making the connection, it will log it to the console
    // and close the application using `process.exit(1)` since we don't want to
    // proceed without a database connection.
    console.error(error);
    process.exit(1);
  }
}

module.exports = connectDB;
