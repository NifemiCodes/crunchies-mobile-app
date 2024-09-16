const { sign } = require("jsonwebtoken");
require("dotenv").config();
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

const createToken = (userID) => {
  const userToken = sign({ id: userID }, process.env.SECRET);
  return userToken;
};

module.exports = { createToken };
