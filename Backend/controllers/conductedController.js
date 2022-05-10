const Vote = require("../models/voting_model");
const { validationResult } = require("express-validator");

const conductedController = async (req, res) => {
  const { email } = req.query;
  let Found = await Vote.find({
    adminEmail: email,
  });
  if (Found)
    return res.json({
      success: true,
      conducted: Found,
    });
  else
    return res.json({
      success: false,
    });
};

module.exports = conductedController;
