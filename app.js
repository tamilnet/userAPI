const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

require("dotenv").config();


const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true
});

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    default: null
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  token: {
    type: String
  },
});

const User = mongoose.model("User", userSchema);

app.post("/register", function (req, res) {

  const newUser = new User({
    user_name: req.body.user_name,
    email: req.body.email,
    password: req.body.password
  });
  newUser.save(function (err) {
    if (!err) {
      res.send("Successfully added a new User.");
    } else {
      res.send(err);
    }
  });
});

app.post("/login", function (req, res) {
  try {
    User.findOne({
      email: req.body.email,
      password: req.body.password
    }, function (err, foundUsers) {
      if (!foundUsers) {
        res.send("Invalid User. Please register your details.");
      } else {

        const token = jwt.sign({
            user_id: User._id,
            email: User.email
          },
          process.env.TOKEN_KEY
        );
        foundUsers.token = token;
        res.status(201).json(foundUsers);

      }
    });
  } catch (err) {
    console.log(err);
  }

});

app.get("/validate", function (req, res) {
  try {
    const token = req.headers["x-access-token"];

    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    if (verified) {
      res.send("Successfully Verified");
    } else {
      res.status(401).send(error);
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});