const express = require("express");
const bodyParser = require("body-parser");
const placesRouter = require("./routes/places-routes");
const HttpError = require("../api/models/http-error");
const userRoutes = require("./routes/users-routes");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRouter);
app.use("/api/users", userRoutes);

//error handler best way
app.use((req, res, next) => {
  const error = new HttpError("could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 3000);
  res.json({ message: error.message || "An unknown error occurred" });
});

app.listen(3000);
