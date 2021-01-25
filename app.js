const express = require("express");
const bodyParser = require("body-parser");
const placesRouter = require("./routes/places-routes");
const HttpError = require("../api/models/http-error");

const app = express();

app.use("/", placesRouter);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 3000);
  res.json({ message: error.message || "An unknown error occurred" });
});

app.listen(3000);
