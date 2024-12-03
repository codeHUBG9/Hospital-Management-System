const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./routes/middlewares/errors");
/**
 * Middleware
 */
//
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * Api Versioning
 */
const ver1 = "/api/v1";

/**
 * Import All Routes
 */
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

/**
 * Map the routes
 */
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

//Custom Middleware to handle error
app.use(errorMiddleware);

module.exports = app;