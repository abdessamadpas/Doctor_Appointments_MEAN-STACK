const express = require("express");
const mongoose = require("mongoose");

//! middlewares
const { limiter } = require("./middlewares/limiter.js");
const helmet = require("helmet");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/errors.js");
const { checkRole } = require("./middlewares/checkRole.js");
require("dotenv").config({ path: "./.env" });

const book = require("./app/appointment/routes.js");
const auth = require("./app/auth/routes.js");
const config = require("./config/index.js");

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

// Routes
app.use("/auth", auth);
app.use("/appointment", book);

app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB using the configuration
mongoose.connect(config.database.url, config.database.options);

// listen to port
const port = config.server.port;
app.listen(port, async () => {
  console.log(`🚀 Server ready at port ${port}`);
});
