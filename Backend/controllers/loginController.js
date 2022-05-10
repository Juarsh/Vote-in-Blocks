const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const User = require("../models/authModels");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  let foundemail = await User.findOne({
    email,
  });
  if (foundemail) {
    bcrypt.compare(password, foundemail.password, function (err, result) {
      if (result == true) {
        const token = jwt.sign(
          {
            id: foundemail._id,
            name: foundemail.name,
            email: foundemail.email,
            aadhar: foundemail.aadhar,
            dateOfBirth: foundemail.dateOfBirth,
          },
          process.env.SECRET,
          { expiresIn: 50000 }
        );
        console.log("Found");
        console.log(token);
        return res.json({
          token,
        });
      } else {
        return res.status(400).json({
          error: "Email or Password does not match",
        });
      }
    });
  } else {
    return res.status(400).json({
      error: "Email does not exist",
    });
  }
};

module.exports = loginController;
