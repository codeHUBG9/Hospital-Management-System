const app =  require('./app.js')
const bcrypt = require("bcrypt");
const connectDatabase = require("./config/database");
const dotenv = require('dotenv')

const morgan = require("morgan"); // For logging requests

// Log all requests using Morgan
app.use(morgan("dev"));

/**
 * setting up config file
 */
dotenv.config({ path: "config/config.env" });
/**
 * Connect with Database
 */
connectDatabase();


// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


/**
 * Handle Uncaught Exceptions
 * These occur when an exception is not caught within the code.
 */
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:");
    console.error(`Message: ${err.message}`);
    console.error(`Stack: ${err.stack}`);
    console.log("Shutting down the server due to an uncaught exception.");
    process.exit(1);
  });

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start the Server
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT} in ${process.env.NODE_ENV} mode.`);
  });


  /**
 * Handle Unhandled Promise Rejections
 * Catches errors like failed database connections or failed async/await calls.
 */
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Promise Rejection:");
    console.error(`Message: ${err.message}`);
    console.log("Shutting down the server due to an unhandled promise rejection.");
    server.close(() => {
      process.exit(1);
    });
  });
