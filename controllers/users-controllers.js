const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

const data_user = [
  {
    id: "u1",
    name: "Alamin Sheikh",
    email: "alamin@gmail.com",
    password: "tester",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: data_user });
};

const signUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("invalid username or pass, please try again", 422);
  }
  const { name, email, password } = req.body;

  const hasUser = data_user.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("email already exists", 422);
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  data_user.push(createdUser);
  res.status(201).json({ user: createdUser });
};

const logIn = (req, res, next) => {
  const { email, password } = req.body;

  const identifierUser = data_user.find((u) => u.email === email);
  if (!identifierUser || identifierUser.password !== password) {
    throw new HttpError(
      "could not find identify user, credials seem to be wrong ",
      401
    );
  }
  res.json({ message: "logged in!" });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.logIn = logIn;
