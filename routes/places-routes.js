const express = require("express");
const HttpError = require("../models/http-error");
const router = express.Router();
const placeControllers = require("../controllers/places-controllers");

router.get("/:pid", placeControllers.getPlaceId);

router.get("/user/:userId", placeControllers.getPlacesByUserId);

router.post("/", placeControllers.createPlaces);

module.exports = router;
