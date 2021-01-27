const express = require("express");
const HttpError = require("../models/http-error");
const router = express.Router();
const placeControllers = require("../controllers/places-controllers");
const { check } = require("express-validator");

router.get("/:pid", placeControllers.getPlaceId);

router.get("/user/:userId", placeControllers.getPlacesByUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placeControllers.createPlaces
);

router.patch(
  "/:pid",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placeControllers.updatePlace
);

router.delete("/:pid", placeControllers.deletePlace);

module.exports = router;
