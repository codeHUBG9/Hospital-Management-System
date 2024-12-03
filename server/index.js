const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const morgan = require("morgan"); // For logging requests

// Import Routes
const getAllPatients = require("./routes/api/getAllPatients");
const getPatientByID = require("./routes/api/getPatientByID");
const createPatient = require("./routes/api/createPatient");
const editPatientByID = require("./routes/api/editPatientByID");
const deletePatientByID = require("./routes/api/deletePatientByID");
const LoginRegisterRoute = require("./routes/LoginRegisterRoute.js");
const UserRoute = require("./routes/UserRoute.js");
const DashboardRoute = require("./routes/DashboardRoute.js");
const PatientRoute = require("./routes/PatientRoute.js");
const DoctorRoute = require("./routes/DoctorRoute.js");
const AppointmentRoute = require("./routes/AppointmentRoute.js");
const MedicineRoute = require("./routes/MedicineRoute.js");
const PrescriptionRoute = require("./routes/PrescriptionRoute.js");
const InvoiceRoute = require("./routes/InvoiceRoute.js");
const ProfileRoute = require("./routes/ProfileRoute.js");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log all requests using Morgan
app.use(morgan("dev"));

mongoose.set("strictQuery", true);

// Database Connection
const dbUrl = process.env.MONGOCONNECTION || "mongodb://localhost:27017";
const port = process.env.PORT || 3001;

mongoose.connect(dbUrl, { useNewUrlParser: true });

// Routes
app.use(LoginRegisterRoute);
app.use(DashboardRoute);
app.use(UserRoute);
app.use(PatientRoute);
app.use(DoctorRoute);
app.use(AppointmentRoute);
app.use(MedicineRoute);
app.use(PrescriptionRoute);
app.use(InvoiceRoute);
app.use(ProfileRoute);
app.use("/api/paypal", require("./routes/api/paypal"));

// Default Route
app.get("/", (req, res) => {
  res.send("hello world");
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start the Server
app.listen(port, () => {
  console.log("App listening on port " + port);
});
