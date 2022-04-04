require("dotenv").config();
const express = require("express");
const { test } = require("media-typer");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 8080;

const routes = require("./routes/api");

app.use(morgan("tiny"));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/ReminderAppDB"
);
mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected.");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("my-app-first/build"));
}

app.use("/api", routes);

app.listen(
  process.env.PORT || 8080,
  console.log(`Server is starting at ${PORT}`)
);