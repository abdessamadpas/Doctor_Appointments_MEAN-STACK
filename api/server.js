const express = require("express");
const mongoose = require("mongoose");

//! middlewares
const { limiter } = require("./middlewares/limiter.js");
const helmet = require("helmet");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/errors.js");
const { checkRole } = require("./middlewares/checkRole.js");
require("dotenv").config({ path: "./.env" });

const appointment = require("./app/appointment/routes.js");
const auth = require("./app/auth/routes.js");
const config = require("./config/index.js");
const patient = require("./app/patient/routes.js");
const doctor = require("./app/doctor/routes.js");
const { sendEmail } = require("./services/nodeMailer.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(limiter);
app.use(cors());

//hello
app.get("/hello", checkRole(["doctor", "patient"]), (req, res) => {
  res.send("Hello World 👋");
});

// // send email 
// const mailOptions = {
//   from: {
//     name: "Doctor App",
//     address: 'boughadoin@gmail.com',
//   }, // sender address
//   to: ["test.dev.pas@gmail.com"], // list of receivers
//   subject: "email from the doctor app", // Subject line
//   text: "wewe world?", // plain text body
//   html: "<b>Hello world?</b>", // html body
// };
// sendEmail(mailOptions);

// Routes
app.use("/auth", auth);
app.use("/appointment", appointment);
app.use("/patient", patient);
app.use("/doctor", doctor);

app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB using the configuration
mongoose.connect(config.database.url, config.database.options).then(() => {
  console.log("🟢 The database is connected.");
})
.catch((error) => {
  console.log("🔴 The database is NOT connected.");
  console.error(error);
  process.exit();
});

// listen to port
const port = config.server.port;
app.listen(port, async () => {
  console.log(`🚀 Server ready at port ${port}`);
});
