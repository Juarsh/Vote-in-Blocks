const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");

require("dotenv").config({
  path: "./config.env",
});

const { authRoutes, voteRoutes } = require("./routes");
const connectDB = require("./config/db");

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );

  app.use(morgan("dev"));
}

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.Cookie_key1, process.env.Cookie_key2],
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", authRoutes);
app.use("/api", voteRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    messsage: "Page not found",
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started at:  ${process.env.PORT}`);
});
