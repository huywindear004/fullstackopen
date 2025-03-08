const config = require("./utils/config");
const logger = require("./utils/logger");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)

  .then((result) => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.info("error connecting to MongoDB:", error.message);
  });

const requestLogger = require("./middlewares/requestLogger");
app.use(requestLogger);

const blogsRouter = require("./controllers/blogs");
app.use("/api/blogs", blogsRouter);

const unknownEndpoint = require("./middlewares/unknownEndpoint");
app.use(unknownEndpoint);

// this has to be the last loaded middleware, also all the routes should be registered before this!
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

module.exports = app;
