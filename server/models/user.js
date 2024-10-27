const mongoose = require("mongoose");
//import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    favourites: [{ type: String }],
    orders: [{ type: Object }],
  },
  { collection: "users" }
);

const user = mongoose.model("User", userSchema);

module.exports = user;
//export default user;
