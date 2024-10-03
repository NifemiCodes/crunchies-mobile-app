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
mongoose
  .connect("mongodb+srv://nifemiakingba:qwF2jND4qGZwfMF5@cluster0.72xue.mongodb.net/crunchies")
  .then(() => console.log("connected to db successfully"))
  .catch((error) => {
    console.log("error connecting to database:", error.message);
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

// get user info
app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dbRes = await user.findById(id);
    console.log(dbRes);
    if (dbRes) {
      const userInfo = {
        id: dbRes._id,
        name: dbRes.name,
        email: dbRes.email,
      };
      res.json({ status: "OK", user: userInfo });
    }
  } catch (error) {
    res.json({ status: "ERROR", message: error.message });
  }
});

// edit user profile
app.put("/profile/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const foundUser = await user.findById(id);
    if (foundUser) {
      const updateRes = await user.updateOne({ _id: id }, { name: name || foundUser.name, email: email || foundUser.email }).exec();

      // if update was successful, send user response
      if (updateRes.modifiedCount === 1) {
        const updatedUser = await user.findById(id);
        res.json({ status: "OK", newUser: { id: updatedUser._id, name: updatedUser.name, email: updatedUser.email } });
      } else {
        throw new Error("failed to update user");
      }
    } else {
      throw new error("No user found");
    }
  } catch (error) {
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

// set user favourites
app.post("/setFavourites", async (req, res) => {
  try {
    const { uid, favourites } = req.body;
    const response = await user.updateOne({ _id: uid }, { favourites: favourites }).exec();
    if (response.modifiedCount === 1) {
      res.json({ status: "OK" });
    } else {
      console.warn("error updating user");
    }
  } catch (error) {
    res.json({ status: "ERROR", message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
