const HttpError = require("../models/http-error");

const data = [
  {
    id: "p1",
    title: "Empire State building",
    description: "one of the most famous sky scrapers in the world",
    location: {
      lat: 40,
      lng: -73,
    },
    address: "Dhaka, Bangladesh",
    creator: "u1",
  },
];

const getPlaceId = (req, res, next) => {
  const placeId = req.params.pid;
  const place = data.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    throw new HttpError("Could not find a place for the provided id.", 404);
  }

  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.userId;
  const user = data.find((p) => {
    return p.creator === userId;
  });
  if (!user) {
    throw new HttpError("could not find the user", 404);
  }
  res.json({ user });
};

const createPlaces = (req, res, next) => {};

exports.getPlaceId = getPlaceId;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlaces = createPlaces;
