const express = require("express");
const mongoose = require("mongoose");
const user = require("./models/user");
const bcrypt = require("bcrypt");
const { createToken } = require("./JWT");
// import express from "express";
// import mongoose from "mongoose";
// import user from "./models/user.js";
// import bcrypt from "bcrypt";
// import { createToken } from "./JWT.js";
// import token from "./models/token.js";

const app = express();

// middleware
app.use(express.json());

// database
// remote conn str:- "mongodb+srv://nifemiakingba:qwF2jND4qGZwfMF5@cluster0.72xue.mongodb.net/crunchies"
mongoose
  .connect("mongodb://localhost:27017/crunchies")
  .then(() => console.log("connected to db successfully"))
  .catch((error) => {
    console.log("error connecting to database");
    throw new Error(error);
  });

/** API ROUTES */

// register
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const foundUser = await user.findOne({ email: email }).exec();
    if (foundUser) {
      res.json({ status: "ERROR", message: "Email is alreay in use" });
    } else {
      const secPassword = await bcrypt.hash(password, 10);
      const newUser = {
        name: name,
        email: email,
        password: secPassword,
      };
      const createdUser = await user.create(newUser);
      if (createdUser.name) {
        const userToken = createToken(createdUser._id);
        const userObj = {
          id: createdUser._id,
          name: createdUser.name,
          email: createdUser.email,
        };
        res.json({ status: "OK", token: userToken, userInfo: userObj, userFavourites: createdUser.favourites });
      }
    }
  } catch (error) {
    res.json({ status: "ERROR", message: error.message });
  }
});

// sign in
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const dbUser = await user.findOne({ email: email }).exec();
    if (dbUser) {
      const isCorrectPassword = await bcrypt.compare(password, dbUser.password);
      if (isCorrectPassword) {
        const userToken = createToken(dbUser._id);
        const userObj = {
          id: dbUser._id,
          name: dbUser.name,
          email: dbUser.email,
        };
        res.json({ status: "OK", token: userToken, userInfo: userObj, userFavourites: dbUser.favourites });
      } else {
        throw new Error("Incorrect password");
      }
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    console.log(error.message);
    res.json({ status: "ERROR", message: error.message });
  }
});

// add item to favourites
app.post("/favourites/add", async (req, res) => {
  try {
    const { pid, uid } = req.body;
    const foundUser = await user.findById(uid);
    if (!foundUser.favourites.includes(pid)) {
      foundUser.favourites.push(pid);
      await foundUser.save();
      res.status(200).json({ status: "OK" });
    }
  } catch (error) {
    res.json({ status: "ERROR", message: error.message });
  }
});

// remove item from favourites
app.delete("/favourites/remove", async (req, res) => {
  const { uid, pid } = req.body;
  try {
    const foundUser = await user.findById(uid);
    if (foundUser.favourites.includes(pid)) {
      foundUser.favourites = foundUser.favourites.filter((el) => el !== pid);
      await foundUser.save();
      res.status(200).json({ status: "OK" });
    }
  } catch (error) {
    res.json({ status: "ERROR", message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
