const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.set("strictQuery", true);
  const dbUrl = process.env.DB_LOCAL_URI || "mongodb://localhost:27017";
  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
      maxPoolSize: 20,
      serverSelectionTimeoutMS: 50000,
      socketTimeoutMS: 95000,
      family: 4,
    })
    .then((con) => {
      console.log(`MongoDB is connected with HOST: ${con.connection.host}`);
    });
};

module.exports = connectDatabase;