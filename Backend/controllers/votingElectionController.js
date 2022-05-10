const Vote = require("../models/voting_model");

const { validationResult } = require("express-validator");

const votingElectionController = async (req, res) => {
  const { email } = req.query;
  let Found = await Vote.find({
    invites: email,
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

module.exports = votingElectionController;
