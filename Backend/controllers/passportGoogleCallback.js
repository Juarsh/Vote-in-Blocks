const jwt = require('jsonwebtoken');

const passportGoogleCallback = function(req, res) {
    if(req.user.aadhar === "undefined") {
      const token = jwt.sign({
          email: req.user.email,
      }, process.env.SECRET, {expiresIn: 50000})
      res.redirect(`${process.env.CLIENT_URL}/details?${token}`)
    } else {
      console.log(req)
      const token = jwt.sign({
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          aadhar: req.user.aadhar,
          dateOfBirth: req.user.dateOfBirth
      }, process.env.SECRET, {expiresIn: 50000})
      res.redirect(`${process.env.CLIENT_URL}/home?${token}`);
    }
}

module.exports = passportGoogleCallback;