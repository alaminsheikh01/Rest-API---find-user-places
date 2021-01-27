const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

let data = [
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
  const places = data.find((p) => {
    return p.creator === userId;
  });
  if (!places || places.length === 0) {
    throw new HttpError("could not find the user", 404);
  }
  res.json({ places });
};

//created data
const createPlaces = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("input invalid passed, please check your data", 422);
  }

  const { title, description, coordinates, address, creator } = req.body;
  //const title = req.body.title;
  const createdPlaces = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  data.push(createdPlaces);
  res.status(201).json({ place: createdPlaces });
};

//updated data
const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid please, check your input data", 422);
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...data.find((p) => p.id === placeId) };
  const placeIndex = data.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  data[placeIndex] = updatedPlace;
  res.status(200).json({ place: updatedPlace });
};

//deleted data
const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (!data.find((p) => p.id === placeId)) {
    throw new HttpError("could not find a place for that id", 404);
  }
  data = data.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Data Deleted!" });
};

exports.getPlaceId = getPlaceId;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlaces = createPlaces;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
