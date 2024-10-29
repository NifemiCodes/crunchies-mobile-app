const express = require("express");
const mongoose = require("mongoose");
const user = require("./models/user");
const bcrypt = require("bcrypt");
const { createToken } = require("./JWT");
const axios = require("axios");
const nodemailer = require("nodemailer");
require("dotenv").config();
const ws = require("ws");

const app = express();

// middleware
app.use(express.json());

// database
mongoose
  .connect(process.env.DB_CONN_STR)
  .then(() => console.log("connected to db successfully"))
  .catch((error) => {
    console.log("error connecting to database:", error.message);
  });

// websocket
const webSocketServer = new ws.Server({ port: 8080 });
webSocketServer.on("connection", () => {
  console.log("wss connection");
});

webSocketServer.on("listening", () => {
  console.log("wss is listening on port 8080");
});

/** Payment Routes */
const baseURLPaystack = process.env.PAYSTACK_BASE_URL;

// initialize transaction
app.post("/payment/initialize", async (req, res) => {
  const { email, amount, callbackUrl, cancelUrl } = req.body;
  try {
    const ax_res = await axios.post(
      `${baseURLPaystack}/transaction/initialize`,
      { email: email, amount: Number(amount) * 100, callback_url: callbackUrl, metadata: { cancel_action: cancelUrl } },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    res.status(200).send(ax_res.data);
  } catch (error) {
    res.json({ status: "ERROR", message: error.message });
  }
});

// payment webhook
app.post("/paystack-webhook", (req, res) => {
  const event = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: event.data.customer.email,
    subject: "Crunchies Order Payment Success",
    text: `This email is to inform you of successful payment via the Crunchies app.\n
    Payment status: ${event.data.status}\n
    Amount: ${event.data.amount / 100}\n
    Paid with: ${event.data.channel} ${event.data.authorization.card_type} ${event.data.authorization.bank}\n
    Time: ${new Date(event.data.paid_at).toDateString()} ${new Date(event.data.paid_at).toLocaleTimeString()}`,
  };

  if (event.data.status === "success") {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error sending email", error.message);
      } else {
        console.log("email sent.", info.response);
      }
    });
  }

  // send payment status to frontend
  const wsc = Array.from(webSocketServer.clients);
  if (wsc[0].readyState === ws.OPEN) {
    wsc[0].send(JSON.stringify({ paymentStatus: event.data.status }));
  }

  res.status(200).send("OK");
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
        res.json({ status: "OK", token: userToken, userInfo: userObj, userFavourites: createdUser.favourites, userOrders: createdUser.orders });
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
        res.json({ status: "OK", token: userToken, userInfo: userObj, userFavourites: dbUser.favourites, userOrders: dbUser.orders });
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

// set new password
// app.post("/password/set", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const foundUser = await user.findOne({ email: email });
//     if (foundUser) {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const updateRes = await user.updateOne({ email: email }, { password: hashedPassword });
//       console.log(updateRes);

//       if (updateRes.modifiedCount === 1) {
//         res.json({ status: "OK" });
//       } else {
//         throw new Error("Failed to update password");
//       }
//     } else {
//       throw new Error("User not found");
//     }
//   } catch (error) {
//     console.log(error.message);
//     res.json({ status: "ERROR", message: error.message });
//   }
// });

// let OTPCode;
// // forgot password
// app.post("/password/forgot", async (req, res) => {
//   const { userEmail } = req.body;
//   try {
//     const genNumbers = [];
//     const maxDigits = 6;
//     for (let i = 0; i < maxDigits; i++) {
//       const num = Math.floor(Math.random() * 9);
//       genNumbers.push(num);
//     }
//     OTPCode = genNumbers.join("");
//     console.log(OTPCode);

//     // send code to email
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.MY_EMAIL,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: "support@crunchiesclone.com",
//       to: userEmail,
//       subject: "Forgot Password - Crunchies",
//       text: `Enter the code below to reset your password:\n\n ${OTPCode}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         res.json({ status: "ERROR", message: error.message });
//         console.log("error sending email", error.message);
//       } else {
//         res.json({ status: "OK", message: info.response });
//         console.log("email sent.", info.response);
//       }
//     });
//   } catch (error) {
//     res.json({ status: "ERROR", message: error.message });
//   }
// });

// // verify OTP
// app.get("/otp/verify/:OTP", (req, res) => {
//   const userOTP = req.params.OTP;
//   console.log("user:", userOTP, "  Code:", OTPCode);
//   const result = userOTP === OTPCode;
//   console.log(result);
//   if (result) {
//     res.json({ status: "OK" });
//   } else {
//     res.json({ status: "ERROR", message: "Wrong password" });
//   }
// });

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

// add user's orders
app.post("/orders/add", async (req, res) => {
  const { uid, orders } = req.body;
  try {
    const foundUser = await user.findById(uid);
    if (foundUser) {
      orders.map((order) => foundUser.orders.push(order));
      await foundUser.save();
      res.json({ status: "OK" });
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    res.json({ status: "ERROR", message: error.message });
  }
});

// delete user's account
app.delete("/user/delete", async (req, res) => {
  const { id } = req.body;
  try {
    const dbResponse = await user.deleteOne({ _id: id }).exec();
    if (dbResponse.deletedCount === 1) {
      res.status(200).json({ status: "OK" });
    } else {
      throw new Error("failed to delete user account");
    }
  } catch (error) {
    console.log(error.message);
    res.json({ status: "ERROR", message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
