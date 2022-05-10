const router = require("express").Router();

const {
  registerController,
  loginController,
  passportGoogleCallback,
} = require("../controllers");

const passport = require("passport");
require("../passport/google");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  passportGoogleCallback
);

router.post("/register", registerController);

router.post("/login", loginController);

module.exports = router;
