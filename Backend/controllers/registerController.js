const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const User = require("../models/authModels");

const saltRounds = 10;

const registerController = async (req, res) => {
  const { name, email, password, dateOfBirth, aadhar } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((err) => error.msg)[0];
    return res.status(422).json({
      error: firstError,
    });
  } else {
    let foundEmail = await User.findOne({
      email,
    });
    if (foundEmail) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
    let foundAadhar = await User.findOne({
      aadhar,
    });
    if (foundAadhar) {
      return res.status(400).json({
        error: "Aadhar is taken",
      });
    }
  }
  let pass;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    pass = hash;
    console.log(pass);
    const user = new User({
      name,
      email,
      password: pass,
      dateOfBirth,
      aadhar,
    });
    console.log(user);
    user.save((err) => {
      if (err) {
        return res.status(400).json({
          errors: err,
        });
      } else {
        return res.json({
          success: true,
          message: "Signup success",
        });
      }
    });
  });
};

module.exports = registerController;
