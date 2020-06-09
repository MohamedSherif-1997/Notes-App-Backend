const HttpError = require("../models/http-error");
const uuid = require("uuid").v4;
const DUMMY_USERS = [
  {
    id: "u1",
    name: "Max",
    email: "test@gmail.com",
    password: "testers",
  },
];
const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;
  const exisingEmail = DUMMY_USERS.find((u) => u.email === email);
  if (exisingEmail) {
    throw new HttpError("Email is already existed", 422);
  }
  const craetedUser = {
    id: uuid(),
    name,
    email,
    password,
  };
  DUMMY_USERS.push(craetedUser);
  res.status(201).json({ user: craetedUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password != password) {
    throw new HttpError("Could not identify user", 401);
  }
  res.json({ message: "logged in" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
